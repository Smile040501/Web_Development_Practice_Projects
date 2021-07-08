import axios from "../../utility/axios";
import {
    POSTS_ACTION_START,
    POSTS_ACTION_SUCCESS,
    POSTS_ACTION_FAIL,
    ADD_POST,
    DELETE_POST,
    UPDATE_POST,
} from "../types";

export const postsActionStart = () => ({ type: POSTS_ACTION_START });

export const postsActionSuccess = (payload) => ({ type: POSTS_ACTION_SUCCESS, payload });

export const postsActionFail = (errorMsg, errors) => ({
    type: POSTS_ACTION_FAIL,
    errorMsg,
    errors,
});

export const fetchPosts = () => async (dispatch, getState) => {
    dispatch(postsActionStart());
    try {
        const res = await axios.get("/api/posts");
        dispatch(postsActionSuccess({ posts: res.data.posts }));
    } catch (err) {
        dispatch(postsActionFail(err.response.data.message, err.response.data.errors?.errors));
    }
};

export const fetchPost = (id) => async (dispatch, getState) => {
    dispatch(postsActionStart());
    try {
        const res = await axios.get(`/api/posts/${id}`);
        dispatch(postsActionSuccess({ post: res.data.post }));
    } catch (err) {
        dispatch(postsActionFail(err.response.data.message, err.response.data.errors?.errors));
    }
};

export const addPost = (postData) => async (dispatch, getState) => {
    dispatch(postsActionStart());
    try {
        const res = await axios.post("/api/posts", postData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        dispatch({ type: ADD_POST, post: res.data.post });
    } catch (err) {
        dispatch(postsActionFail(err.response.data.message, err.response.data.errors?.errors));
    }
};

export const deletePost = (postId) => async (dispatch, getState) => {
    dispatch(postsActionStart());
    try {
        await axios.delete(`/api/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        dispatch({ type: DELETE_POST, postId });
    } catch (err) {
        dispatch(postsActionFail(err.response.data.message, err.response.data.errors?.errors));
    }
};

export const updatePost = (post) => ({ type: UPDATE_POST, post });

export const likePost = (postId) => async (dispatch, getState) => {
    dispatch(postsActionStart());
    try {
        const res = await axios.post(
            `/api/posts/${postId}/like`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        dispatch(updatePost(res.data.post));
    } catch (err) {
        dispatch(postsActionFail(err.response.data.message, err.response.data.errors?.errors));
    }
};

export const unlikePost = (postId) => async (dispatch, getState) => {
    dispatch(postsActionStart());
    try {
        const res = await axios.post(
            `/api/posts/${postId}/unlike`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        dispatch(updatePost(res.data.post));
    } catch (err) {
        dispatch(postsActionFail(err.response.data.message, err.response.data.errors?.errors));
    }
};

export const addComment = (postId, commentData) => async (dispatch, getState) => {
    dispatch(postsActionStart());
    try {
        const res = await axios.post(`/api/posts/${postId}/comments`, commentData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        dispatch(updatePost(res.data.post));
    } catch (err) {
        dispatch(postsActionFail(err.response.data.message, err.response.data.errors?.errors));
    }
};

export const deleteComment = (postId, commentId) => async (dispatch, getState) => {
    dispatch(postsActionStart());
    try {
        const res = await axios.delete(`/api/posts/${postId}/comments/${commentId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        dispatch(updatePost(res.data.post));
    } catch (err) {
        dispatch(postsActionFail(err.response.data.message, err.response.data.errors?.errors));
    }
};
