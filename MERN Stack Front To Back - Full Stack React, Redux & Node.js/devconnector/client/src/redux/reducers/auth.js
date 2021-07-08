import { updateObject } from "../../utility/updateObject";
import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } from "../types";

const initialState = {
    token: null,
    user: null,
    loading: false,
    errorMsg: "",
    errors: null,
};

const authStart = (state, action) =>
    updateObject(state, { loading: true, errorMsg: "", errors: null });

const authSuccess = (state, { payload }) =>
    updateObject(state, { loading: false, errorMsg: "", errors: null, ...payload });

const authFail = (state, { errorMsg, errors }) =>
    updateObject(state, { loading: false, errorMsg, errors: errors ? errors : null });

const authLogout = (state, action) =>
    updateObject(state, { token: null, user: null, errorMsg: "", errors: null, loading: false });

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_START:
            return authStart(state, action);
        case AUTH_SUCCESS:
            return authSuccess(state, action);
        case AUTH_FAIL:
            return authFail(state, action);
        case AUTH_LOGOUT:
            return authLogout(state, action);
        default:
            return state;
    }
};

export default reducer;
