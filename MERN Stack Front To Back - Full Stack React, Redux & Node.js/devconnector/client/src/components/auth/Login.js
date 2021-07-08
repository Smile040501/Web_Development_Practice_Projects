import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Redirect } from "react-router-dom";

import TextFieldGroup from "../common/TextFieldGroup";
import Spinner from "../common/Spinner";
import { loginUser } from "../../redux/actions/index";
import {
    selectAuthUser,
    selectAuthErrors,
    selectAuthLoading,
    selectAuthErrorMsg,
} from "../../redux/selector";

const Login = () => {
    const user = useSelector(selectAuthUser, shallowEqual);
    const errorMsg = useSelector(selectAuthErrorMsg, shallowEqual);
    const errors = useSelector(selectAuthErrors, shallowEqual);
    const loading = useSelector(selectAuthLoading, shallowEqual);
    const dispatch = useDispatch();

    const [state, setState] = useState({
        email: "",
        password: "",
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
        const { email, password } = state;
        dispatch(loginUser({ email, password }));
    };

    if (user) {
        return <Redirect to="/dashboard" />;
    }

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Log In</h1>
                        <p className="lead text-center">Sign in to your DevConnector account</p>
                        {errorMsg && (
                            <>
                                <br /> <p style={{ color: "red" }}>{errorMsg}</p>
                            </>
                        )}
                        <form noValidate onSubmit={onSubmit}>
                            <TextFieldGroup
                                type="email"
                                placeholder="Email Address"
                                autoComplete="username"
                                name="email"
                                value={state.email}
                                onChange={onChange}
                                error={state.errors.email}
                            />
                            <TextFieldGroup
                                type="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                name="password"
                                value={state.password}
                                onChange={onChange}
                                error={state.errors.password}
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

export default Login;
