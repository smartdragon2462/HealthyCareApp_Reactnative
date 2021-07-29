import { call, put, takeLatest, take, select } from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as mainAction from "../actions/mainAction";
import AsyncStorage from "@react-native-community/async-storage";
import * as NavigationService from '../navigationService'
import * as Api from '../util/Api';
import Toast from 'react-native-simple-toast';

export const getAuth = (state) => state.get('auth');
export const getRoot = (state) => state.get('root');


function* getExploreDataAttempt(action) {
    let token = yield AsyncStorage.getItem('token')
    const res = yield call(Api.getExploreData, token);

    if (res.status == "success") {
        yield put(mainAction.getExploreDataSuccess(res.data));
    } else {
        yield put(mainAction.getExploreDataFailed());
    }


    // NavigationService.navigate('drawer');
}
function* getExploreDataFailed(action) {
    //     yield put(dashboardActions.setProductCount(0));
    // NavigationService.navigate('drawer');
}
function* getExploreDataSuccess(action) {

}

function* checkAbleToChatAttempt(action) {
    let token = yield AsyncStorage.getItem('token')
    const res = yield call(Api.checkAbleToChat, token);
    if (res.status == "success") {
        yield put(mainAction.checkAbleToChatSuccess(action.participant));
    } else {
        Toast.show(res.msg, Toast.LONG)
        yield put(mainAction.checkAbleToChatFailed());
    }
    // NavigationService.navigate('drawer');
}
function* checkAbleToChatFailed(action) {
    //     yield put(dashboardActions.setProductCount(0));
    NavigationService.navigate('membership');
}
function* checkAbleToChatSuccess(action) {
    NavigationService.navigate('chatting', { participant: action.participant });
}


export function* sagaFlow() {
    yield takeLatest(actions.GET_EXPLORE_DATA_ATTEMPT, getExploreDataAttempt);
    yield takeLatest(actions.GET_EXPLORE_DATA_FAILED, getExploreDataFailed);
    yield takeLatest(actions.GET_EXPLORE_DATA_SUCCESS, getExploreDataSuccess);

    yield takeLatest(actions.CHECK_ABLE_TO_CHAT_ATTEMPT, checkAbleToChatAttempt);
    yield takeLatest(actions.CHECK_ABLE_TO_CHAT_FAILED, checkAbleToChatFailed);
    yield takeLatest(actions.CHECK_ABLE_TO_CHAT_SUCCESS, checkAbleToChatSuccess);
}

