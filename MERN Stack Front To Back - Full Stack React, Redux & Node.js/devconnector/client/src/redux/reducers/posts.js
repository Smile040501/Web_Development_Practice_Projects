import { updateObject } from "../../utility/updateObject";
import {
    POSTS_ACTION_START,
    POSTS_ACTION_SUCCESS,
    POSTS_ACTION_FAIL,
    ADD_POST,
    DELETE_POST,
    UPDATE_POST,
} from "../types";

const initialState = {
    posts: [],
    post: {},
    loading: false,
    errorMsg: "",
    errors: null,
};

const postsActionStart = (state, action) =>
    updateObject(state, { errorMsg: "", errors: null, loading: true });

const postsActionSuccess = (state, { payload }) =>
    updateObject(state, { loading: false, errorMsg: "", errors: null, ...payload });

const postsActionFail = (state, { errorMsg, errors }) =>
    updateObject(state, { loading: false, errorMsg, errors: errors ? errors : null });

const addPost = (state, { post }) =>
    updateObject(state, {
        loading: false,
        errorMsg: "",
        errors: null,
        posts: [post, ...state.posts],
    });

const deletePost = (state, { postId }) =>
    updateObject(state, {
        loading: false,
        errorMsg: "",
        errors: null,
        posts: state.posts.filter((post) => post.id.toString() !== postId.toString()),
        post:
            Object.keys(state.post).length !== 0 && state.post.id.toString() === postId.toString()
                ? null
                : state.post,
    });

const updatePost = (state, { post }) =>
    updateObject(state, {
        loading: false,
        errorMsg: "",
        errors: null,
        posts: state.posts.map((p) => (p.id.toString() === post.id.toString() ? post : p)),
        post:
            Object.keys(state.post).length !== 0 && state.post.id.toString() === post.id.toString()
                ? post
                : state.post,
    });

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case POSTS_ACTION_START:
            return postsActionStart(state, action);
        case POSTS_ACTION_SUCCESS:
            return postsActionSuccess(state, action);
        case POSTS_ACTION_FAIL:
            return postsActionFail(state, action);
        case ADD_POST:
            return addPost(state, action);
        case DELETE_POST:
            return deletePost(state, action);
        case UPDATE_POST:
            return updatePost(state, action);
        default:
            return state;
    }
};

export default reducer;
