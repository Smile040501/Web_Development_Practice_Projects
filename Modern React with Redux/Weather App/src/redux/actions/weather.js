import { FETCH_WEATHER } from "../types";
import axios from "../../apis/weather";

export const fetchWeatherSuccess = (data) => {
    return {
        type: FETCH_WEATHER,
        payload: data,
    };
};

export const fetchWeather = (city) => async (dispatch, getState) => {
    try {
        const res = await axios.get("/", {
            params: {
                q: city,
            },
        });
        dispatch(fetchWeatherSuccess(res.data));
    } catch (error) {
        console.log(error);
    }
};
