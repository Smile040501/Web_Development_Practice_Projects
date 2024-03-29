import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { deletePost, likePost, unlikePost } from "../../redux/actions/index";
import { selectAuthUser } from "../../redux/selector";

const PostItem = ({ post, showActions }) => {
    const user = useSelector(selectAuthUser, shallowEqual);
    const dispatch = useDispatch();

    const onDeleteClick = (id) => {
        dispatch(deletePost(id));
    };

    const onLikeClick = (id) => {
        dispatch(likePost(id));
    };

    const onUnlikeClick = (id) => {
        dispatch(unlikePost(id));
    };

    const findUserLike = (likes) => {
        if (likes.filter((like) => like.userId.toString() === user.userId.toString()).length > 0) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-2">
                    <a href="profile.html">
                        <img
                            className="rounded-circle d-none d-md-block"
                            src={post.avatar}
                            alt=""
                        />
                    </a>
                    <br />
                    <p className="text-center">{post.name}</p>
                </div>
                <div className="col-md-10">
                    <p className="lead">{post.text}</p>
                    {showActions ? (
                        <span>
                            <button
                                onClick={() => onLikeClick(post.id)}
                                type="button"
                                className="btn btn-light mr-1"
                            >
                                <i
                                    className={[
                                        "fas fa-thumbs-up",
                                        findUserLike(post.likes) ? "text-info" : "",
                                    ].join(" ")}
                                />
                                <span className="badge badge-light">{post.likes.length}</span>
                            </button>
                            <button
                                onClick={() => onUnlikeClick(post.id)}
                                type="button"
                                className="btn btn-light mr-1"
                            >
                                <i className="text-secondary fas fa-thumbs-down" />
                            </button>
                            <Link to={`/post/${post.id}`} className="btn btn-info mr-1">
                                Comments
                            </Link>
                            {post.userId.toString() === user.userId.toString() ? (
                                <button
                                    onClick={() => onDeleteClick(post.id)}
                                    type="button"
                                    className="btn btn-danger mr-1"
                                >
                                    <i className="fas fa-times" />
                                </button>
                            ) : null}
                        </span>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default PostItem;
