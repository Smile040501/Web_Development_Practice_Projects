import axios from "../../utility/axios";
import history from "../../shared/history";
import {
    PROFILES_ACTION_START,
    PROFILES_ACTION_SUCCESS,
    PROFILES_ACTION_FAIL,
    DELETE_ACCOUNT,
} from "../types";
import { authLogout } from "./auth";

export const profilesActionStart = () => ({ type: PROFILES_ACTION_START });

export const profilesActionSuccess = (payload) => ({ type: PROFILES_ACTION_SUCCESS, payload });

export const profilesActionFail = (errorMsg, errors) => ({
    type: PROFILES_ACTION_FAIL,
    errorMsg,
    errors,
});

export const fetchProfiles = () => async (dispatch, getState) => {
    dispatch(profilesActionStart());
    try {
        const res = await axios.get("/api/profiles");
        dispatch(profilesActionSuccess({ profiles: res.data.profiles }));
    } catch (err) {
        dispatch(profilesActionFail(err.response.data.message, err.response.data.errors?.errors));
    }
};

export const fetchProfileByHandle = (handle) => async (dispatch, getState) => {
    dispatch(profilesActionStart());
    try {
        const res = await axios.get(`/api/profiles/handle/${handle}`);
        dispatch(profilesActionSuccess({ profile: res.data.profile, repos: res.data.repos }));
    } catch (err) {
        dispatch(profilesActionFail(err.response.data.message, err.response.data.errors?.errors));
    }
};

export const fetchCurrentUserProfile = () => async (dispatch, getState) => {
    dispatch(profilesActionStart());
    try {
        const res = await axios.get("/api/profiles/me", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        dispatch(profilesActionSuccess({ profile: res.data.profile }));
    } catch (err) {
        dispatch(profilesActionFail(err.response.data.message, err.response.data.errors?.errors));
    }
};

export const createOrEditProfile = (profileData) => async (dispatch, getState) => {
    dispatch(profilesActionStart());
    try {
        const res = await axios.post("/api/profiles", profileData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        dispatch(profilesActionSuccess({ profile: res.data.profile }));
        history.push("/dashboard");
    } catch (err) {
        dispatch(profilesActionFail(err.response.data.message, err.response.data.errors?.errors));
    }
};

export const addExperience = (expData) => async (dispatch, getState) => {
    dispatch(profilesActionStart());
    try {
        const res = await axios.post("/api/profiles/experience", expData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        dispatch(profilesActionSuccess({ profile: res.data.profile }));
        history.push("/dashboard");
    } catch (err) {
        dispatch(profilesActionFail(err.response.data.message, err.response.data.errors?.errors));
    }
};

export const addEducation = (eduData) => async (dispatch, getState) => {
    dispatch(profilesActionStart());
    try {
        const res = await axios.post("/api/profiles/education", eduData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        dispatch(profilesActionSuccess({ profile: res.data.profile }));
        history.push("/dashboard");
    } catch (err) {
        dispatch(profilesActionFail(err.response.data.message, err.response.data.errors?.errors));
    }
};

export const deleteExperience = (eid) => async (dispatch, getState) => {
    dispatch(profilesActionStart());
    try {
        const res = await axios.delete(`/api/profiles/experience/${eid}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        dispatch(profilesActionSuccess({ profile: res.data.profile }));
        history.push("/dashboard");
    } catch (err) {
        dispatch(profilesActionFail(err.response.data.message, err.response.data.errors?.errors));
    }
};

export const deleteEducation = (eid) => async (dispatch, getState) => {
    dispatch(profilesActionStart());
    try {
        const res = await axios.delete(`/api/profiles/education/${eid}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        dispatch(profilesActionSuccess({ profile: res.data.profile }));
        history.push("/dashboard");
    } catch (err) {
        dispatch(profilesActionFail(err.response.data.message, err.response.data.errors?.errors));
    }
};

export const deleteAccount = () => async (dispatch, getState) => {
    dispatch(profilesActionStart());
    try {
        await axios.delete(`/api/profiles/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        dispatch({ type: DELETE_ACCOUNT });
        dispatch(authLogout());
        history.push("/login");
    } catch (err) {
        dispatch(profilesActionFail(err.response.data.message, err.response.data.errors?.errors));
    }
};

export const clearCurrentProfile = () => (dispatch, getState) => {
    dispatch(profilesActionSuccess({ profile: null }));
};
