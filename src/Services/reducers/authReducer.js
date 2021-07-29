import * as actions from "../actions/action-types";

export default function authReducer(state, action = {}) {
    switch (action.type) {
        case actions.LOGIN_SUCCESS:
            let user = {
                ...action,
            }
            delete user['type'];
            return state.withMutations(state => {
                state
                    .set('token', user.token)
                    .set('_id', user._id)
                    .set('name', user.name)
                    .set('email', user.email)
                    .set('phoneNumber', user.phoneNumber)
                    .set('verified', user.status ? true : false)
                    .set('authUser', user)
            });

        case actions.VALIDATE_TOKEN_SUCCESS:
            user = {
                ...action,
            }
            delete user['type'];
            return state.withMutations(state => {
                state
                    .set('token', user.token)
                    .set('_id', user._id)
                    .set('name', user.name)
                    .set('email', user.email)
                    .set('phoneNumber', user.phoneNumber)                    
                    .set('verified', user.status ? true : false)
                    .set('authUser', user)
            });
        case actions.VALIDATE_TOKEN_FAILED:
            return state.withMutations(state => {
                state
                    .set('token', '')
                    .set('_id', '')
                    .set('name', '')
                    .set('email', '')
                    .set('phoneNumber', '')
                    .set('verified', false)
                    .set('authUser', {})
            });
        case actions.LOGOUT_SUCCESS:
            return state.withMutations(state => {
                state
                    .set('token', '')
                    .set('_id', '')
                    .set('name', '')
                    .set('email', '')
                    .set('phoneNumber', '')
                    .set('verified', false)
                    .set('authUser', {})
            });
        case actions.UPDATE_USER_SUCCESS:
            user = {
                ...action,
            }
            delete user['type'];
            return state.withMutations(state => {
                state
                    .set('name', user.name)
                    .set('_id', user._id)
                    .set('email', user.email)
                    .set('phoneNumber', user.phoneNumber)
                    .set('verified', user.verified ? true : false)
                    .set('authUser', user)
            });
        case actions.COMPLETE_PROFILE_SUCCESS:
            user = {
                ...action,
            }
            delete user['type'];
            return state.withMutations(state => {
                state
                    .set('authUser', user)
            });
        case actions.REGISTER_FAILED:
            return state.withMutations(state => {
                state
                    .set('token', '')
                    .set('_id', '')
                    .set('name', '')
                    .set('email', '')
                    .set('phoneNumber', '')
                    .set('verified', false)
                    .set('authUser', {})
            });
        case actions.REGISTER_SUCCESS:
            user = {
                ...action,
            }
            return state.withMutations(state => {
                state
                    .set('token', user.token)
                    .set('name', user.name)
                    .set('email', user.email)
                    .set('_id', user._id)
                    .set('verified', false)
                    .set('authUser', {})
            });
        case actions.SET_EMAIL_FOR_RESET_PASSWORD:
            return state.withMutations(state => {
                state
                    .set('email', action.email)
            });
        default:
            return state
    }
}