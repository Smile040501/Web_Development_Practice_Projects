import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import styles from "./Auth.module.css";
import { auth, setAuthRedirectPath } from "../../redux/actions/index";
import { checkValidity } from "../../shared/utility";

const Auth = (props) => {
    const [authForm, setAuthForm] = useState({
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: "Mail Address",
            },
            value: "",
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            touched: false,
        },
        password: {
            elementType: "input",
            elementConfig: {
                type: "password",
                placeholder: "Password",
            },
            value: "",
            validation: {
                required: true,
                minLength: 6,
            },
            valid: false,
            touched: false,
        },
    });
    const [isSignup, setIsSignup] = useState(true);

    useEffect(() => {
        if (!props.buildingBurger && props.authRedirectPath !== "/") {
            props.onSetAuthRedirectPath("/");
        }
    }, []);

    const inputChangedHandler = (e, controlName) => {
        const { isValid: isValidIdentifier, errorMsg } = checkValidity(
            e.target.value,
            authForm[controlName].validation
        );

        setAuthForm((prevState) => {
            return {
                ...prevState,
                [controlName]: {
                    ...prevState[controlName],
                    value: e.target.value,
                    valid: isValidIdentifier,
                    touched: true,
                    errorMsg,
                },
            };
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignup);
    };

    const switchAuthModeHandler = () => {
        setIsSignup((prevState) => !prevState);
    };

    const formElementsArray = [];
    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key],
        });
    }

    let form = (
        <form onSubmit={submitHandler}>
            {formElementsArray.map((formElement) => {
                return (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(e) => inputChangedHandler(e, formElement.id)}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        errorMessage={formElement.config.errorMsg}
                    />
                );
            })}
            <Button btnType="Success">Submit</Button>
        </form>
    );

    if (props.loading) {
        form = <Spinner />;
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = <p>{props.error.message}</p>;
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />;
    }

    return (
        <div className={styles.Auth}>
            {authRedirect}
            {errorMessage}
            {form}
            <Button btnType="Danger" clicked={switchAuthModeHandler}>
                SWITCH TO {isSignup ? "SIGNIN" : "SIGNUP"}
            </Button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    };
};

const mapDispatchToProps = {
    onAuth: auth,
    onSetAuthRedirectPath: setAuthRedirectPath,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
