import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
    FETCH_INGREDIENTS_FAILED,
    INIT_INGREDIENTS,
} from "../types";

export const addIngredient = (ingName) => {
    return {
        type: ADD_INGREDIENT,
        payload: {
            ingredientName: ingName,
        },
    };
};

export const removeIngredient = (ingName) => {
    return {
        type: REMOVE_INGREDIENT,
        payload: {
            ingredientName: ingName,
        },
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: SET_INGREDIENTS,
        payload: {
            ingredients,
        },
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: FETCH_INGREDIENTS_FAILED,
    };
};

export const initIngredients = () => {
    return {
        type: INIT_INGREDIENTS,
    };
};
