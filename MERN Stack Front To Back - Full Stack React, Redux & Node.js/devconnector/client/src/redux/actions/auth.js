import axios from "../../utility/axios";
import history from "../../shared/history";
import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } from "../types";

export const authStart = () => ({ type: AUTH_START });

export const authSuccess = (payload) => ({ type: AUTH_SUCCESS, payload });

export const authFail = (errorMsg, errors) => ({ type: AUTH_FAIL, errorMsg, errors });

export const registerUser = (userData) => async (dispatch, getState) => {
    dispatch(authStart());
    try {
        await axios.post("/api/users/register", userData);
        dispatch(authSuccess({}));
        history.push("/login");
    } catch (err) {
        console.log(err.response);
        dispatch(authFail(err.response.data.message, err.response.data.errors?.errors));
    }
};

export const authLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expirationDate");
    return { type: AUTH_LOGOUT };
};

export const checkAuthTimeout = (expirationTime) => (dispatch, getState) => {
    setTimeout(() => {
        dispatch(authLogout());
    }, expirationTime * 1000);
};

export const loginUser = (userData) => async (dispatch, getState) => {
    dispatch(authStart());
    try {
        const res = await axios.post("/api/users/login", userData);
        const { userId, email, name, avatar, expiresIn, token } = res.data;
        const user = { userId, email, name, avatar };
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(checkAuthTimeout(expiresIn));
        await dispatch(authSuccess({ token, user }));
        history.push("/dashboard");
    } catch (err) {
        dispatch(authFail(err.response.data.message, err.response.data.errors?.errors));
    }
};

export const authCheckState = () => (dispatch, getState) => {
    const token = localStorage.getItem("token");
    if (!token) {
        dispatch(authLogout());
    } else {
        const expirationDate = new Date(localStorage.getItem("expirationDate"));
        if (expirationDate <= new Date()) {
            dispatch(authLogout());
        } else {
            const user = JSON.parse(localStorage.getItem("user"));
            dispatch(authSuccess({ token, user }));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
};
