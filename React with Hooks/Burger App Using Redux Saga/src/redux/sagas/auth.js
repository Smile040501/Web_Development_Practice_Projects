// import { delay } from "redux-saga";
import { put, delay, call } from "redux-saga/effects";
import axios from "axios";

import {
    authLogoutSucceed,
    authLogout,
    authStart,
    authSuccess,
    authFail,
    checkAuthTimeout,
} from "../actions/index";

export function* authLogoutSaga(action) {
    yield call([localStorage, "removeItem"], "token");
    yield call([localStorage, "removeItem"], "expirationDate");
    yield call([localStorage, "removeItem"], "userId");
    yield put(authLogoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(authLogout());
}

export function* authSaga(action) {
    yield put(authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true,
    };
    const API_KEY = process.env.REACT_APP_API_KEY;
    let url = `${process.env.REACT_APP_SIGNUP_BASE_URL}?key=${API_KEY}`;
    if (!action.isSignup) {
        url = `${process.env.REACT_APP_SIGNIN_BASE_URL}?key=${API_KEY}`;
    }
    try {
        const res = yield axios.post(url, authData);
        const expirationDate = yield new Date(new Date().getTime() + res.data.expiresIn * 1000);
        yield localStorage.setItem("token", res.data.idToken);
        yield localStorage.setItem("expirationDate", expirationDate);
        yield localStorage.setItem("userId", res.data.localId);
        yield put(authSuccess(res.data.idToken, res.data.localId));
        yield put(checkAuthTimeout(res.data.expiresIn));
    } catch (err) {
        yield put(authFail(err.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem("token");
    if (!token) {
        yield put(authLogout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem("expirationDate"));
        if (expirationDate <= new Date()) {
            yield put(authLogout());
        } else {
            const userId = yield localStorage.getItem("userId");
            yield put(authSuccess(token, userId));
            yield put(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}
