import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Spinner from "../common/Spinner";
import { fetchPosts } from "../../redux/actions/index";
import { selectPosts, selectPostsLoading, selectPostsErrorMsg } from "../../redux/selector";

const Posts = () => {
    const errorMsg = useSelector(selectPostsErrorMsg, shallowEqual);
    const loading = useSelector(selectPostsLoading, shallowEqual);
    const posts = useSelector(selectPosts, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    let postContent;
    if (loading) {
        postContent = <Spinner />;
    } else if (posts && posts.length > 0) {
        postContent = <PostFeed posts={posts} />;
    } else if (errorMsg) {
        postContent = <div style={{ color: "red" }}>{errorMsg}</div>;
    } else {
        postContent = <div>No posts yet!</div>;
    }

    return (
        <div className="feed">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <PostForm />
                        {postContent}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Posts;
