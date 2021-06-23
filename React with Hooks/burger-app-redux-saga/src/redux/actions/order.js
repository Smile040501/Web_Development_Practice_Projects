import {
    PURCHASE_BURGER,
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_START,
    PURCHASE_INIT,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL,
    FETCH_ORDERS,
} from "../types";

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: PURCHASE_BURGER_SUCCESS,
        payload: {
            orderId: id,
            orderData,
        },
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: PURCHASE_BURGER_FAIL,
        payload: {
            error,
        },
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: PURCHASE_BURGER_START,
    };
};

export const purchaseBurger = (orderData, token) => {
    return {
        type: PURCHASE_BURGER,
        token,
        orderData,
    };
};

export const purchaseInit = () => {
    return {
        type: PURCHASE_INIT,
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        payload: {
            orders,
        },
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: FETCH_ORDERS_FAIL,
        payload: {
            error,
        },
    };
};

export const fetchOrdersStart = () => {
    return {
        type: FETCH_ORDERS_START,
    };
};

export const fetchOrders = (token, userId) => {
    return {
        type: FETCH_ORDERS,
        token,
        userId,
    };
};
