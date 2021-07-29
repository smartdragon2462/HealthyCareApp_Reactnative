import * as actions from "./action-types";

export function setLoading(isLoading) {
    return {
        type: actions.SET_LOADING,
        isLoading: isLoading
    }
}

export function setVerificationCode(code, isForRegister) {
    return {
        type: actions.SET_VERIFICATION_CODE,
        verificationCode: code,
        isForRegister: isForRegister
    }
}