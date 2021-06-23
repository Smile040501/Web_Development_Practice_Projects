import _ from "lodash";

import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    // Whenever we can all action creator inside an action creator, make sure to dispatch it
    // If the inner action creator returns an object, that object will be dispatched
    // If the inner action creator returns a function, it will be invoked by dispatch and inner function should also dispatch something
    await dispatch(fetchPosts());

    const userIds = _.uniq(_.map(getState().posts, "userId"));
    userIds.forEach((id) => dispatch(fetchUser(id)));
};

export const fetchPosts = () => async (dispatch, getState) => {
    const response = await jsonPlaceholder.get("/posts");

    dispatch({ type: "FETCH_POSTS", payload: response.data });
};

export const fetchUser = (id) => async (dispatch, getState) => {
    const res = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: "FETCH_USER", payload: res.data });
};

// export const fetchUser = (id) => (dispatch, getState) => _fetchUser(id, dispatch);

// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const res = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({ type: "FETCH_USER", payload: res.data });
// });
