import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";

import PostItem from "../Posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import Spinner from "../common/Spinner";
import { fetchPost } from "../../redux/actions/index";
import { selectPost, selectPostsLoading, selectPostsErrorMsg } from "../../redux/selector";

const Post = (props) => {
    const post = useSelector(selectPost, shallowEqual);
    const loading = useSelector(selectPostsLoading, shallowEqual);
    const errorMsg = useSelector(selectPostsErrorMsg, shallowEqual);
    const dispatch = useDispatch();

    const { id } = props.match.params;

    useEffect(() => {
        dispatch(fetchPost(id));
    }, [id, dispatch]);

    let postContent;
    if (loading) {
        postContent = <Spinner />;
    } else if (post && Object.keys(post).length !== 0) {
        postContent = (
            <div>
                <PostItem post={post} showActions={false} />
                <CommentForm postId={post.id} />
                <CommentFeed postId={post.id} comments={post.comments} />
            </div>
        );
    } else if (errorMsg) {
        postContent = <div style={{ color: "red" }}>{errorMsg}</div>;
    } else {
        postContent = <div>Can't Find the Post!</div>;
    }

    return (
        <div className="post">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/feed" className="btn btn-light mb-3">
                            Back To Feed
                        </Link>
                        {postContent}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
