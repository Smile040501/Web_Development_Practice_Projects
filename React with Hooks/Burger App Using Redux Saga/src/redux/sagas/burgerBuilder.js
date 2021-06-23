import { put } from "redux-saga/effects";

import { setIngredients, fetchIngredientsFailed } from "../actions/index";
import axios from "../../axios-orders";

export function* initIngredientsSaga(action) {
    try {
        const res = yield axios.get("/ingredients.json");
        yield put(setIngredients(res.data));
    } catch (err) {
        yield put(fetchIngredientsFailed());
    }
}
