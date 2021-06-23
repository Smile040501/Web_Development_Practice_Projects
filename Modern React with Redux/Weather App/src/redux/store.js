import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers/";

const composeEnhancers =
    (process.env.NODE_ENV === "development" &&
        typeof window !== "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const middlewares = [thunk];

export default createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
