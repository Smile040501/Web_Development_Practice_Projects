import _ from "lodash";

import { CREATE_STREAM, FETCH_STREAMS, FETCH_STREAM, EDIT_STREAM, DELETE_STREAM } from "../types";
import { updateObject } from "../../shared/utility";

const initialState = {};

const createStream = (state, action) => {
    return updateObject(state, { [action.payload.id]: action.payload });
};

const fetchStreams = (state, action) => {
    const newState = { ...state };
    action.payload.forEach((stream) => {
        newState[stream.id] = stream;
    });
    return newState;
    // return {...state, ..._.mapKeys(action.payload, "id")}
};

const fetchStream = (state, action) => {
    return updateObject(state, { [action.payload.id]: action.payload });
};

const editStream = (state, action) => {
    return updateObject(state, { [action.payload.id]: action.payload });
};

const deleteStream = (state, action) => {
    // const newState = {...state};
    // delete newState[action.payload];
    return _.omit(state, action.payload);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_STREAM:
            return createStream(state, action);
        case FETCH_STREAMS:
            return fetchStreams(state, action);
        case FETCH_STREAM:
            return fetchStream(state, action);
        case EDIT_STREAM:
            return editStream(state, action);
        case DELETE_STREAM:
            return deleteStream(state, action);
        default:
            return state;
    }
};

export default reducer;
