import { SIGN_IN, SIGN_OUT } from "../types";
import { updateObject } from "../../shared/utility";

const initialState = {
    isSignedIn: null,
    userId: null,
};

const signIn = (state, action) => {
    return updateObject(state, { isSignedIn: true, userId: action.payload.userId });
};

const signOut = (state, action) => {
    return updateObject(state, { isSignedIn: false, userId: null });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return signIn(state, action);
        case SIGN_OUT:
            return signOut(state, action);
        default:
            return state;
    }
};

export default reducer;
