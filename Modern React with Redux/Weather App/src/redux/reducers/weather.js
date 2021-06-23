import { FETCH_WEATHER } from "../types";

const initalState = [];

const fetchWeather = (state, action) => {
    return [action.payload, ...state];
};

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case FETCH_WEATHER:
            return fetchWeather(state, action);
        default:
            return state;
    }
};

export default reducer;
