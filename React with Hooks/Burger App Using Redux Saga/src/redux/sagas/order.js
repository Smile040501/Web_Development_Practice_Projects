import { put } from "redux-saga/effects";

import {
    purchaseBurgerStart,
    purchaseBurgerSuccess,
    purchaseBurgerFail,
    fetchOrdersSuccess,
    fetchOrdersFail,
    fetchOrdersStart,
} from "../actions/index";
import axios from "../../axios-orders";

export function* purchaseBurgerSaga(action) {
    yield put(purchaseBurgerStart());
    try {
        const res = yield axios.post(`/orders.json?auth=${action.token}`, action.orderData);
        yield put(purchaseBurgerSuccess(res.data.name, action.orderData));
    } catch (err) {
        yield put(purchaseBurgerFail(err));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(fetchOrdersStart());
    try {
        const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
        const res = yield axios.get(`./orders.json${queryParams}`);
        const fetchedOrders = Object.entries(res.data).map(([key, val]) => ({
            id: key,
            ...val,
        }));
        yield put(fetchOrdersSuccess(fetchedOrders));
    } catch (err) {
        yield put(fetchOrdersFail(err));
    }
}
