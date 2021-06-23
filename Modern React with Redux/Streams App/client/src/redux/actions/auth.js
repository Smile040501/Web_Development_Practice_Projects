import { SIGN_IN, SIGN_OUT } from "../types";

export const signIn = (googleId) => {
    return {
        type: SIGN_IN,
        payload: {
            userId: googleId,
        },
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT,
    };
};
