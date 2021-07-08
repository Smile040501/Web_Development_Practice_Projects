import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import Spinner from "../common/Spinner";
import { addEducation } from "../../redux/actions/index";
import {
    selectProfilesErrorMsg,
    selectProfilesErrors,
    selectProfilesLoading,
} from "../../redux/selector";

const AddEducation = () => {
    const errorMsg = useSelector(selectProfilesErrorMsg, shallowEqual);
    const errors = useSelector(selectProfilesErrors, shallowEqual);
    const loading = useSelector(selectProfilesLoading, shallowEqual);
    const dispatch = useDispatch();

    const [state, setState] = useState({
        school: "",
        degree: "",
        fieldOfStudy: "",
        from: "",
        to: "",
        current: false,
        description: "",
        errors: {},
        disabled: false,
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

    const onCheck = () => {
        setState((prevState) => ({
            ...prevState,
            disabled: !prevState.disabled,
            current: !prevState.current,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const eduData = {
            school: state.school,
            degree: state.degree,
            fieldOfStudy: state.fieldOfStudy,
            from: state.from,
            to: state.to,
            current: state.current,
            description: state.description,
        };

        dispatch(addEducation(eduData));
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="add-education">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to="/dashboard" className="btn btn-light">
                            Go Back
                        </Link>
                        <h1 className="display-4 text-center">Add Education</h1>
                        <p className="lead text-center">
                            Add any school, bootcamp, etc that you have attended
                        </p>
                        {errorMsg && (
                            <>
                                <br /> <p style={{ color: "red" }}>{errorMsg}</p>
                                <br />
                            </>
                        )}
                        <small className="d-block pb-3">* = required fields</small>
                        <form onSubmit={onSubmit}>
                            <TextFieldGroup
                                placeholder="* School"
                                name="school"
                                value={state.school}
                                onChange={onChange}
                                error={state.errors.school}
                            />
                            <TextFieldGroup
                                placeholder="* Degree or Certification"
                                name="degree"
                                value={state.degree}
                                onChange={onChange}
                                error={state.errors.degree}
                            />
                            <TextFieldGroup
                                placeholder="* Field Of Study"
                                name="fieldOfStudy"
                                value={state.fieldOfStudy}
                                onChange={onChange}
                                error={state.errors.fieldOfStudy}
                            />
                            <h6>From Date</h6>
                            <TextFieldGroup
                                type="date"
                                name="from"
                                value={state.from}
                                onChange={onChange}
                                error={state.errors.from}
                            />
                            <h6>To Date</h6>
                            <TextFieldGroup
                                type="date"
                                name="to"
                                value={state.to}
                                onChange={onChange}
                                error={state.errors.to}
                                disabled={state.disabled ? "disabled" : ""}
                            />
                            <div className="form-check mb-4">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="current"
                                    value={state.current}
                                    checked={state.current}
                                    onChange={onCheck}
                                    id="current"
                                />
                                <label htmlFor="current" className="form-check-label">
                                    Current Education
                                </label>
                            </div>
                            <TextAreaFieldGroup
                                placeholder="Program Description"
                                name="description"
                                value={state.description}
                                onChange={onChange}
                                error={state.errors.description}
                                info="Tell us about the program that you were in."
                            />
                            <input
                                type="submit"
                                value="Submit"
                                className="btn btn-info btn-block mt-4"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEducation;
