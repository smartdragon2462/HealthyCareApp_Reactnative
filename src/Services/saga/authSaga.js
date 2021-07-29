import { call, put, takeLatest, take, select } from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as rootAction from "../actions/rootAction";
import * as authAction from "../actions/authAction";
import AsyncStorage from "@react-native-community/async-storage";
import * as NavigationService from '../navigationService'
import * as Api from '../util/Api';
import Toast from 'react-native-simple-toast';
import { io } from "socket.io-client";
import DeviceInfo from 'react-native-device-info';
import { socket_url } from "../util/config";
// import { LoginManager } from "react-native-fbsdk";

export const getAuth = (state) => state.get('auth');
export const getRoot = (state) => state.get('root');


//////////////////////////////////////////////////////////////////////////////////////////
const generateVerificationCode = () => {
    let x = Math.floor((Math.random() * 100000));
    let str = "00000" + x.toString();
    let verificationCode = str.substring(str.length - 5, str.length);
    return verificationCode;
}

//////////////////////////////////////////////////////////////////////////////////////////
function connect() {
    const socket = io(socket_url);
    return new Promise(resolve => {
        socket.on('connect', () => {
            resolve(socket);
            console.log("Socket connected");
        });
    });
}

//////////////////////////////////////////////////////////////////////////////////////////
function* loginAttempt(action) {
    let user = {
        ...action
    };

    delete user['type'];
    // const doctorRes = yield call(Api.doctorLogin, user);
    const res = yield call(Api.login, user);

    // let result = null, userData = null;
    // if (doctorRes.status) {
    //     result = doctorRes,
    //     userData = doctorRes.doctor,
    //     yield AsyncStorage.setItem('user_role', 'doctor')
    // }
    // else if (userRes.status) {
    //     result = userRes,
    //     userData = userRes.user,
    //     yield AsyncStorage.setItem('user_role', 'user')
    // } 
    // else if (!doctorRes.status) {
    //     result = doctorRes
    // } 
    // else if (!userRes.status) {
    //     result = userRes
    // } 

    console.log("res=====>", res)
    if (res.status === true) {
        let userData = null;
        if (res.user) { userData = res.user; yield AsyncStorage.setItem('user_role', 'user') }
        else { userData = res.doctor; yield AsyncStorage.setItem('user_role', 'doctor') }

        if (!userData) {
            yield put(authAction.loginFailed());
            return;
        }

        const socket = yield call(connect);
        const device_id = yield DeviceInfo.getUniqueId();
        socket.emit('online', { _id: userData.ID.toString(), device_id: device_id });
        yield AsyncStorage.setItem('token', userData.token)
        yield AsyncStorage.setItem('_id', userData.ID.toString())
        yield put(authAction.loginSuccess(userData));

    } else if (!res.status) {
        Toast.show(res.message, Toast.LONG);
        yield put(authAction.loginFailed());
    } else {
        Toast.show('Login failed', Toast.LONG);
        yield put(authAction.loginFailed());
    }
}


//////////////////////////////////////////////////////////////////////////////////////////
function* loginFailed(action) {
    // yield put(rootAction.setLoading(false));
    //     yield put(dashboardActions.setProductCount(0));
    // NavigationService.navigate('drawer');
}

//////////////////////////////////////////////////////////////////////////////////////////
function* loginSuccess(action) {
    // yield put(rootAction.setLoading(false));
    console.log("loginSuccess=======>", action);
    NavigationService.navigate('Dashboard');
    // const socket = yield call(connect)
    // const { verified, email, quiz, gender, assessment } = action 
    // const { token } = action
    // if (token) {
    //     // NavigationService.navigate('Dashboard');
    //     // if (!gender) {
    //     //     NavigationService.navigate('setupAccount');
    //     // } else {
    //     //     if (!quiz) {
    //     //         NavigationService.navigate('introQuiz');
    //     //     }
    //     //     else {
    //     //         if (!assessment) {
    //     //             NavigationService.navigate('introAssessment');
    //     //         }
    //     //         else {
    //     //             NavigationService.navigate('main');
    //     //         }
    //     //     }
    //     // }
    // }
    // else {
    //     let verificationCode = generateVerificationCode();
    //     // yield put(rootAction.setVerificationCode(verificationCode, true));
    //     // yield put(authAction.sendVerificationCode(verificationCode));
    //     // NavigationService.navigate('verification');
    // }
}

//////////////////////////////////////////////////////////////////////////////////////////
function* validateTokenAttempt(action) {
    let user = {
        ...action
    };

    // let fcmToken = yield AsyncStorage.getItem('fcmToken')
    // user = {
    //     ...user,
    //     fcmToken: fcmToken
    // }
    delete user['type'];
    const res = yield call(Api.validateToken, user);

    if (res.status == "success" && res.data) {
        let user = res.data;
        const socket = yield call(connect);
        const device_id = yield DeviceInfo.getUniqueId();
        socket.emit('online', { _id: user._id, device_id: device_id });
        yield AsyncStorage.setItem('token', user.token)
        yield AsyncStorage.setItem('_id', user._id)
        yield put(authAction.validateTokenSuccess(user));
    } else if (res.status == "failed") {
        Toast.show(res.msg, Toast.LONG);
        // yield AsyncStorage.setItem('token', user.token)
        yield AsyncStorage.removeItem('token')
        yield put(authAction.validateTokenFailed());
    } else {
        Toast.show('Login failed', Toast.LONG);
        yield AsyncStorage.removeItem('token')
        yield put(authAction.validateTokenFailed());
    }
}

//////////////////////////////////////////////////////////////////////////////////////////
function* validateTokenFailed(action) {
    //     yield put(dashboardActions.setProductCount(0));
    // NavigationService.navigate('drawer');
}

//////////////////////////////////////////////////////////////////////////////////////////
function* validateTokenSuccess(action) {
    const { verified, email, quiz, assessment, imagePath, gender } = action
    if (verified) {

        if (!gender) {
            NavigationService.navigate('setupAccount');
        } else {
            if (!quiz) {
                NavigationService.navigate('introQuiz');
            }
            else {
                if (!assessment) {
                    NavigationService.navigate('introAssessment');
                }
                else {
                    NavigationService.navigate('main');
                }
            }
        }
    }
    else {
        let verificationCode = generateVerificationCode();
        yield put(rootAction.setVerificationCode(verificationCode, true));
        yield put(authAction.sendVerificationCode(verificationCode));
        console.log('verification code1: ', verificationCode)
        NavigationService.navigate('verification');
    }
}

//////////////////////////////////////////////////////////////////////////////////////////
function* logoutAttempt(action) {

    // let fcmToken = yield AsyncStorage.getItem('fcmToken')
    // let auth = yield select(getAuth);
    // let token = auth.get('token')
    let token = yield AsyncStorage.getItem('token')
    let data = {
        // fcmToken: fcmToken,
        token: token
    };
    if (token && token != "undefined") {
        const res = yield call(Api.logout, data);
        if (res.status == "success") {
            yield put(authAction.logoutSuccess());
        } else if (res.status == "failed") {
            Toast.show(res.msg, Toast.LONG);
            yield put(authAction.logoutFailed());
        } else {
            Toast.show('Logout failed', Toast.LONG);
            yield put(authAction.logoutFailed());
        }
    } else {
        yield put(authAction.logoutSuccess())
    }
}


//////////////////////////////////////////////////////////////////////////////////////////
function* logoutFailed(action) {
    //     yield put(dashboardActions.setProductCount(0));
    // NavigationService.navigate('drawer');
}

//////////////////////////////////////////////////////////////////////////////////////////
function* logoutSuccess(action) {
    let _id = yield AsyncStorage.getItem('_id');
    let device_id = yield DeviceInfo.getUniqueId();
    let socket = io(socket_url);
    socket.emit('offline', { device_id: device_id, _id: _id })
    yield AsyncStorage.removeItem('token')
    yield AsyncStorage.removeItem('_id')
    // LoginManager.logOut();
    NavigationService.navigate('login')
}

//////////////////////////////////////////////////////////////////////////////////////////
function* updateUserAttempt(action) {
    let updatedUser = {
        ...action
    };
    // let auth = yield select(getAuth);
    // let token = auth.get('token')
    let token = yield AsyncStorage.getItem('token')
    delete updatedUser['type'];
    const res = yield call(Api.update, updatedUser, token);
    if (res && res.status == "success" && res.data) {
        let user = res.data;
        yield put(authAction.updateUserSuccess(user));
    } else {
        yield put(authAction.updateUserFailed());
    }
}

//////////////////////////////////////////////////////////////////////////////////////////
function* updateUserFailed(action) {
}

//////////////////////////////////////////////////////////////////////////////////////////
function* updateUserSuccess(action) {
}

//////////////////////////////////////////////////////////////////////////////////////////
function* completeProfileAttempt(action) {
    let updatedUser = {
        ...action
    };
    // let auth = yield select(getAuth);
    // let token = auth.get('token')
    let token = yield AsyncStorage.getItem('token')
    delete updatedUser['type'];
    const res = yield call(Api.update, updatedUser, token);
    if (res && res.status == "success" && res.data) {
        let user = res.data;
        yield put(authAction.completeProfileSuccess(user));
    } else {
        Toast.show(res.msg, Toast.LONG)
        yield put(authAction.completeProfileFailed());
    }
}

//////////////////////////////////////////////////////////////////////////////////////////
function* completeProfileFailed(action) {
}

//////////////////////////////////////////////////////////////////////////////////////////
function* completeProfileSuccess(action) {
    NavigationService.navigate('introQuiz')
}


// //////////////////////////////////////////////////////////////////////////////////////////
// function* loginAttempt(action) {
//     let user = {
//         ...action
//     };

//     delete user['type'];
//     const doctorRes = yield call(Api.doctorLogin, user);
//     const userRes = yield call(Api.userLogin, user);

//     let result = null, userData = null;
//     if (doctorRes.status) {
//         result = doctorRes,
//             userData = doctorRes.doctor,
//             yield AsyncStorage.setItem('user_role', 'doctor')
//     }
//     else if (userRes.status) {
//         result = userRes,
//             userData = userRes.user,
//             yield AsyncStorage.setItem('user_role', 'user')
//     }

//     if (result.status === true && userData) {
//         const socket = yield call(connect);
//         const device_id = yield DeviceInfo.getUniqueId();
//         socket.emit('online', { _id: userData.ID.toString(), device_id: device_id });
//         yield AsyncStorage.setItem('token', userData.token)
//         yield AsyncStorage.setItem('_id', userData.ID.toString())
//         yield put(authAction.loginSuccess(userData));

//     } else if (!result.status) {
//         Toast.show(result.msg, Toast.LONG);
//         yield put(authAction.loginFailed());
//     } else {
//         Toast.show('Login failed', Toast.LONG);
//         yield put(authAction.loginFailed());
//     }
// }

//////////////////////////////////////////////////////////////////////////////////////////
function* registerAttempt(action) {
    // let verificationCode = generateVerificationCode();
    const user = {
        ...action,
        // verified: false,
        // verificationCode: verificationCode
    }
    delete user['type'];
    const res = yield call(user.role === 'doctor' ? Api.createDoctor : Api.createUser, user);
    console.log("registerAttempt=========>", res)
    if (res.status) {
        const socket = yield call(connect);
        const device_id = yield DeviceInfo.getUniqueId();
        socket.emit('online', { _id: res.data.ID.toString(), device_id: device_id });
        yield AsyncStorage.setItem('user_role', user.role === 'doctor' ? 'doctor' : 'patient')
        yield AsyncStorage.setItem('token', res.data.token)
        yield AsyncStorage.setItem('_id', res.ID.toString())
        // yield put(rootAction.setVerificationCode(verificationCode, true));
        yield put(authAction.registerSuccess(res.data))
    } else if (!res.status) {
        Toast.show(res.message, Toast.LONG);
        yield put(authAction.registerFailed())
    } else {
        Toast.show('Registration failed', Toast.LONG);
        yield put(authAction.registerFailed())
    }
}

//////////////////////////////////////////////////////////////////////////////////////////
function* registerFailed(action) {
}

//////////////////////////////////////////////////////////////////////////////////////////
function* registerSuccess(action) {
    // let verificationCode = generateVerificationCode();
    NavigationService.navigate('Dashboard');
}

//////////////////////////////////////////////////////////////////////////////////////////
function* verifyAttempt(action) {
    let auth = yield select(getAuth);
    let root = yield select(getRoot);
    if (root.get('isForRegister')) {
        const res = yield call(Api.verifyEmail, auth.get('token'));
        if (res.status == "success") {
            yield put(authAction.verifySuccess());
        } else {
            yield put(authAction.verifyFailed());
        }
    } else {
        yield put(rootAction.setLoading(false));
        NavigationService.navigate('resetPassword');
    }

    // NavigationService.navigate('drawer');
}

//////////////////////////////////////////////////////////////////////////////////////////
function* verifyFailed(action) {
    //     yield put(dashboardActions.setProductCount(0));
    // NavigationService.navigate('drawer');
}

//////////////////////////////////////////////////////////////////////////////////////////
function* verifySuccess(action) {
    NavigationService.navigate('setupAccount');
}

//////////////////////////////////////////////////////////////////////////////////////////
function* sendVerificationCode(action) {
    const { verificationCode } = action;
    let root = yield select(getRoot);
    let auth = yield select(getAuth);
    let email = auth.get('email');
    let data = {
        email: email,
        verificationCode: verificationCode
    }
    console.log('verification code3: ', verificationCode)
    yield put(rootAction.setVerificationCode(verificationCode, root.get('isForRegister') ? true : false))
    let res = yield call(Api.sendVerificationCode, data);
    yield put(rootAction.setLoading(false));
    if (res && res.status == 'success') {
        NavigationService.navigate('verification');
    }
}

//////////////////////////////////////////////////////////////////////////////////////////
function* resendVerificationCode(action) {
    let root = yield select(getRoot);
    let verificationCode = generateVerificationCode();
    console.log('verification code4: ', verificationCode)
    yield put(rootAction.setVerificationCode(verificationCode, root.get('isForRegister') ? true : false));
    yield put(authAction.sendVerificationCode(verificationCode));
}

//////////////////////////////////////////////////////////////////////////////////////////
function* setEmailForResetPassword(action) {
    let verificationCode = generateVerificationCode();
    yield put(rootAction.setVerificationCode(verificationCode, false))
    yield put(authAction.sendVerificationCode(verificationCode))
}

//////////////////////////////////////////////////////////////////////////////////////////
function* resetPassword(action) {
    let { phone, password } = action;
    let data = {
        phone: phone,
        password: password
    }
    let res = yield call(Api.resetPassword, data)

    console.log("resetpassword======>", action, phone, password, res)
    // yield put(rootAction.setLoading(false));
    if (res && res.status) {
        NavigationService.navigate('Login');
    }
}

//////////////////////////////////////////////////////////////////////////////////////////
export function* sagaFlow() {
    yield takeLatest(actions.LOGIN_ATTEMPT, loginAttempt);
    yield takeLatest(actions.LOGIN_FAILED, loginFailed);
    yield takeLatest(actions.LOGIN_SUCCESS, loginSuccess);

    yield takeLatest(actions.VALIDATE_TOKEN_ATTEMPT, validateTokenAttempt);
    yield takeLatest(actions.VALIDATE_TOKEN_FAILED, validateTokenFailed);
    yield takeLatest(actions.VALIDATE_TOKEN_SUCCESS, validateTokenSuccess);

    yield takeLatest(actions.LOGOUT_ATTEMPT, logoutAttempt);
    yield takeLatest(actions.LOGOUT_FAILED, logoutFailed);
    yield takeLatest(actions.LOGOUT_SUCCESS, logoutSuccess);

    yield takeLatest(actions.UPDATE_USER_ATTEMPT, updateUserAttempt);
    yield takeLatest(actions.UPDATE_USER_FAILED, updateUserFailed);
    yield takeLatest(actions.UPDATE_USER_SUCCESS, updateUserSuccess);

    yield takeLatest(actions.COMPLETE_PROFILE_ATTEMPT, completeProfileAttempt);
    yield takeLatest(actions.COMPLETE_PROFILE_FAILED, completeProfileFailed);
    yield takeLatest(actions.COMPLETE_PROFILE_SUCCESS, completeProfileSuccess);

    yield takeLatest(actions.REGISTER_ATTEMPT, registerAttempt);
    yield takeLatest(actions.REGISTER_FAILED, registerFailed);
    yield takeLatest(actions.REGISTER_SUCCESS, registerSuccess);

    yield takeLatest(actions.VERIFY_EMAIL_ATTEMPT, verifyAttempt);
    yield takeLatest(actions.VERIFY_EMAIL_FAILED, verifyFailed);
    yield takeLatest(actions.VERIFY_EMAIL_SUCCESS, verifySuccess);

    yield takeLatest(actions.SEND_VERIFICATION_CODE, sendVerificationCode);
    yield takeLatest(actions.RESEND_VERIFICATION_CODE, resendVerificationCode);
    yield takeLatest(actions.SET_EMAIL_FOR_RESET_PASSWORD, setEmailForResetPassword);
    yield takeLatest(actions.RESET_PASSWORD, resetPassword);
}

