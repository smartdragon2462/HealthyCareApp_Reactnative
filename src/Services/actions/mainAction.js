import * as actions from "./action-types";

export function getExploreDataAttempt() {
    return {
        type: actions.GET_EXPLORE_DATA_ATTEMPT
    }
}

export function getExploreDataFailed() {
    return {
        type: actions.GET_EXPLORE_DATA_FAILED,
    }
}

export function getExploreDataSuccess(data) {
    return {
        type: actions.GET_EXPLORE_DATA_SUCCESS,
        exploreData: data
    }
}

export function checkAbleToChatAttempt(_id) {
    return {
        type: actions.CHECK_ABLE_TO_CHAT_ATTEMPT,
        participant: _id
    }
}

export function checkAbleToChatFailed() {
    return {
        type: actions.CHECK_ABLE_TO_CHAT_FAILED
    }
}

export function checkAbleToChatSuccess(_id) {
    return {
        type: actions.CHECK_ABLE_TO_CHAT_SUCCESS,
        participant: _id
    }
}
