import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Redirect } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";
import Spinner from "../common/Spinner";
import { registerUser } from "../../redux/actions/index";
import {
    selectAuthUser,
    selectAuthErrors,
    selectAuthLoading,
    selectAuthErrorMsg,
} from "../../redux/selector";

const Register = () => {
    const user = useSelector(selectAuthUser, shallowEqual);
    const errorMsg = useSelector(selectAuthErrorMsg, shallowEqual);
    const errors = useSelector(selectAuthErrors, shallowEqual);
    const loading = useSelector(selectAuthLoading, shallowEqual);
    const dispatch = useDispatch();

    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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
        const { name, email, password, confirmPassword } = state;
        dispatch(registerUser({ name, email, password, confirmPassword }));
    };

    if (user) {
        return <Redirect to="/dashboard" />;
    }

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your DevConnector account</p>
                        {errorMsg && (
                            <>
                                <br /> <p style={{ color: "red" }}>{errorMsg}</p>
                            </>
                        )}
                        <form noValidate onSubmit={onSubmit}>
                            <TextFieldGroup
                                type="text"
                                placeholder="Name"
                                autoComplete="name"
                                name="name"
                                value={state.name}
                                onChange={onChange}
                                error={state.errors.name}
                            />
                            <TextFieldGroup
                                type="email"
                                placeholder="Email Address"
                                autoComplete="username"
                                name="email"
                                value={state.email}
                                onChange={onChange}
                                error={state.errors.email}
                                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                            />
                            <TextFieldGroup
                                type="password"
                                placeholder="Password"
                                autoComplete="new-password"
                                name="password"
                                value={state.password}
                                onChange={onChange}
                                error={state.errors.password}
                                hasButton={true}
                            />
                            <TextFieldGroup
                                type="password"
                                placeholder="Confirm Password"
                                autoComplete="new-password"
                                name="confirmPassword"
                                value={state.confirmPassword}
                                onChange={onChange}
                                error={state.errors.confirmPassword}
                                hasButton={true}
                            />
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
