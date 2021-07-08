import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../redux/actions/index";
import { selectAuthUser, selectPostsErrorMsg, selectPostsErrors } from "../../redux/selector";

const PostForm = () => {
    const user = useSelector(selectAuthUser, shallowEqual);
    const errors = useSelector(selectPostsErrors, shallowEqual);
    const errorMsg = useSelector(selectPostsErrorMsg, shallowEqual);
    const dispatch = useDispatch();

    const [state, setState] = useState({
        text: "",
        errors: {},
    });

    useEffect(() => {
        if (errors) {
            const errorObj = {};
            errors.forEach((error) => {
                !errorObj[error.param] && (errorObj[error.param] = error.msg);
            });
            setState((prevState) => ({
                ...prevState,
                errors: errorObj,
            }));
        } else if (state.errors) {
            setState((prevState) => ({ ...prevState, errors: {} }));
        }
    }, [errors]);

    const onChange = (e) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            text: state.text,
            name: user.name,
            avatar: user.avatar,
        };
        dispatch(addPost(newPost));
        setState((prevState) => ({
            ...prevState,
            text: "",
        }));
    };

    return (
        <div className="post-form mb-3">
            <div className="card card-info">
                <div className="card-header bg-info text-white">Say Something...</div>
                <div className="card-body">
                    {errorMsg && (
                        <>
                            <br /> <p style={{ color: "red" }}>{errorMsg}</p>
                            <br />
                        </>
                    )}
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <TextAreaFieldGroup
                                placeholder="Create a Post"
                                name="text"
                                value={state.text}
                                onChange={onChange}
                                error={state.errors.text}
                            />
                        </div>
                        <button type="submit" className="btn btn-dark">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostForm;
