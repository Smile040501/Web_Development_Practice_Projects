import { updateObject } from "../../utility/updateObject";
import {
    PROFILES_ACTION_START,
    PROFILES_ACTION_SUCCESS,
    PROFILES_ACTION_FAIL,
    DELETE_ACCOUNT,
} from "../types";

const initialState = {
    profiles: null,
    profile: null,
    loading: false,
    errorMsg: "",
    errors: null,
    repos: [],
};

export const profilesActionsStart = (state, action) =>
    updateObject(state, { loading: true, errorMsg: "" });

export const profilesActionSuccess = (state, { payload }) =>
    updateObject(state, { loading: false, errors: null, ...payload });

export const profilesActionFail = (state, { errorMsg, errors }) =>
    updateObject(state, { loading: false, errorMsg, errors: errors ? errors : null });

export const deleteAccount = (state, action) =>
    updateObject(state, {
        profiles: state.profiles
            ? state.profiles.filter((profile) => profile.id !== state.profile.id)
            : state.profiles,
        profile: null,
        loading: false,
        errorMsg: "",
        errors: null,
    });

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILES_ACTION_START:
            return profilesActionsStart(state, action);
        case PROFILES_ACTION_SUCCESS:
            return profilesActionSuccess(state, action);
        case PROFILES_ACTION_FAIL:
            return profilesActionFail(state, action);
        case DELETE_ACCOUNT:
            return deleteAccount(state, action);
        default:
            return state;
    }
};

export default reducer;
