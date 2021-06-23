import axios from "../../apis/streams";
import { CREATE_STREAM, FETCH_STREAM, FETCH_STREAMS, DELETE_STREAM, EDIT_STREAM } from "../types";
import { updateObject } from "../../shared/utility";
import history from "../../shared/history";

export const createStream = (formValues, userId) => async (dispatch, getState) => {
    try {
        const res = await axios.post("/streams", updateObject(formValues, { userId }));
        dispatch({ type: CREATE_STREAM, payload: res.data });
        history.push("/");
    } catch (error) {
        console.log(error);
    }
};

export const fetchStreams = () => async (dispatch, getState) => {
    try {
        const res = await axios.get("/streams");
        dispatch({ type: FETCH_STREAMS, payload: res.data });
    } catch (error) {
        console.log(error);
    }
};

export const fetchStream = (id) => async (dispatch, getState) => {
    try {
        const res = await axios.get(`/streams/${id}`);
        dispatch({ type: FETCH_STREAM, payload: res.data });
    } catch (error) {
        console.log(error);
    }
};

export const editStream = (id, formValues) => async (dispatch, getState) => {
    try {
        const res = await axios.patch(`/streams/${id}`, formValues);
        dispatch({ type: EDIT_STREAM, payload: res.data });
        history.push("/");
    } catch (error) {
        console.log(error);
    }
};

export const deleteStream = (id) => async (dispatch, getState) => {
    try {
        await axios.delete(`/streams/${id}`);
        dispatch({ type: DELETE_STREAM, payload: id });
        history.push("/");
    } catch (error) {
        console.log(error);
    }
};
