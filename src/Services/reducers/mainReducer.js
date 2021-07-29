import * as actions from "../actions/action-types";

export default function mainReducer(state, action = {}) {
    switch (action.type) {
        case actions.GET_EXPLORE_DATA_SUCCESS:
            return state.withMutations(state => {
                state
                    .set('commonData', action.exploreData)
            });
        case actions.LOGOUT_SUCCESS:
            return state.withMutations(state => {
                state
                    .set('commonData', [])
            });
        default:
            return state
    }
}