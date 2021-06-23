import { combineReducers } from "redux";

import authReducer from "./auth";
import streamsReducer from "./streams";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
    auth: authReducer,
    form: formReducer, // Key name has to be form
    streams: streamsReducer,
});
