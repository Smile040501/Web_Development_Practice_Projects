import { combineReducers } from "redux";

import authReducer from "./auth";
import profilesReducer from "./profiles";
import postsReducer from "./posts";

export default combineReducers({
    auth: authReducer,
    profiles: profilesReducer,
    posts: postsReducer,
});
