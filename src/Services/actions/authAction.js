import * as actions from "./action-types";

export function loginAttempt(phone, password) {
    return {
        type: actions.LOGIN_ATTEMPT,
        phone: phone,
        password: password
    }
}

export function loginFailed() {
    return {
        type: actions.LOGIN_FAILED,
    }
}

export function loginSuccess(user) {
    return {
        type: actions.LOGIN_SUCCESS,
        ...user
    }
}

export function validateTokenAttempt(token) {
    return {
        type: actions.VALIDATE_TOKEN_ATTEMPT,
        token: token
    }
}

export function validateTokenFailed() {
    return {
        type: actions.VALIDATE_TOKEN_FAILED,
    }
}

export function validateTokenSuccess(user) {
    return {
        type: actions.VALIDATE_TOKEN_SUCCESS,
        ...user
    }
}
export function logoutAttempt() {
    return {
        type: actions.LOGOUT_ATTEMPT,
    }
}

export function logoutFailed() {
    return {
        type: actions.LOGOUT_FAILED,
    }
}

export function logoutSuccess() {
    return {
        type: actions.LOGOUT_SUCCESS
    }
}

export function registerAttempt(user) {
    return {
        type: actions.REGISTER_ATTEMPT,
        ...user
    }
}

export function registerSuccess(user) {
    return {
        type: actions.REGISTER_SUCCESS,
        ...user
    }
}

export function registerFailed() {
    return {
        type: actions.REGISTER_FAILED,
    }
}

export function verifyAttempt() {
    return {
        type: actions.VERIFY_EMAIL_ATTEMPT
    }
}

export function verifyFailed() {
    return {
        type: actions.VERIFY_EMAIL_FAILED
    }
}

export function verifySuccess() {
    return {
        type: actions.VERIFY_EMAIL_SUCCESS
    }
}

export function sendVerificationCode(code) {
    return {
        type: actions.SEND_VERIFICATION_CODE,
        verificationCode: code
    }
}

export function resendVerificationCode(code) {
    return {
        type: actions.RESEND_VERIFICATION_CODE,
    }
}

export function setEmailForResetPassword(email) {
    return {
        type: actions.SET_EMAIL_FOR_RESET_PASSWORD,
        email: email
    }
}

export function resetPassword(phone, password) {
    return {
        type: actions.RESET_PASSWORD,
        phone: phone,
        password: password
    }
}

export function updateUserAttempt(user) {
    return {
        type: actions.UPDATE_USER_ATTEMPT,
        ...user
    }
}

export function updateUserFailed() {
    return {
        type: actions.UPDATE_USER_FAILED,
    }
}

export function updateUserSuccess(user) {
    return {
        type: actions.UPDATE_USER_SUCCESS,
        ...user
    }
}

export function completeProfileAttempt(user) {
    return {
        type: actions.COMPLETE_PROFILE_ATTEMPT,
        ...user
    }
}

export function completeProfileFailed() {
    return {
        type: actions.COMPLETE_PROFILE_FAILED,
    }
}

export function completeProfileSuccess(user) {
    return {
        type: actions.COMPLETE_PROFILE_SUCCESS,
        ...user
    }
}

