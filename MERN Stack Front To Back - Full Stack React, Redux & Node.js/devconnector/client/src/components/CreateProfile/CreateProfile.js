import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import Spinner from "../common/Spinner";
import { createOrEditProfile } from "../../redux/actions/index";
import {
    selectProfilesErrorMsg,
    selectProfilesLoading,
    selectProfilesErrors,
} from "../../redux/selector";

const CreateProfile = () => {
    const errorMsg = useSelector(selectProfilesErrorMsg, shallowEqual);
    const errors = useSelector(selectProfilesErrors, shallowEqual);
    const loading = useSelector(selectProfilesLoading, shallowEqual);
    const dispatch = useDispatch();

    const [state, setState] = useState({
        displaySocialInputs: false,
        handle: "",
        company: "",
        website: "",
        location: "",
        status: "",
        skills: "",
        githubUsername: "",
        bio: "",
        twitter: "",
        facebook: "",
        linkedIn: "",
        youTube: "",
        instagram: "",
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
        const profileData = {
            handle: state.handle,
            company: state.company,
            website: state.website,
            location: state.location,
            status: state.status,
            skills: state.skills,
            githubUsername: state.githubUsername,
            bio: state.bio,
            twitter: state.twitter,
            facebook: state.facebook,
            linkedIn: state.linkedIn,
            youTube: state.youTube,
            instagram: state.instagram,
        };

        dispatch(createOrEditProfile(profileData));
    };

    let socialInputs;
    if (state.displaySocialInputs) {
        socialInputs = (
            <div>
                <TextFieldGroup
                    placeholder="Twitter Profile URL"
                    name="twitter"
                    hasIcon={true}
                    icon="fab fa-twitter"
                    value={state.twitter}
                    onChange={onChange}
                    error={state.errors.twitter}
                />
                <TextFieldGroup
                    placeholder="Facebook Page URL"
                    name="facebook"
                    hasIcon={true}
                    icon="fab fa-facebook"
                    value={state.facebook}
                    onChange={onChange}
                    error={state.errors.facebook}
                />
                <TextFieldGroup
                    placeholder="LinkedIn Profile URL"
                    name="linkedIn"
                    hasIcon={true}
                    icon="fab fa-linkedin"
                    value={state.linkedIn}
                    onChange={onChange}
                    error={state.errors.linkedIn}
                />
                <TextFieldGroup
                    placeholder="YouTube Channel URL"
                    name="youTube"
                    hasIcon={true}
                    icon="fab fa-youtube"
                    value={state.youTube}
                    onChange={onChange}
                    error={state.errors.youTube}
                />
                <TextFieldGroup
                    placeholder="Instagram Page URL"
                    name="instagram"
                    hasIcon={true}
                    icon="fab fa-instagram"
                    value={state.instagram}
                    onChange={onChange}
                    error={state.errors.instagram}
                />
            </div>
        );
    }

    // Select options for status
    const options = [
        { label: "* Select Professional Status", value: 0 },
        { label: "Developer", value: "Developer" },
        { label: "Junior Developer", value: "Junior Developer" },
        { label: "Senior Developer", value: "Senior Developer" },
        { label: "Manager", value: "Manager" },
        { label: "Student or Learning", value: "Student or Learning" },
        { label: "Instructor or Teacher", value: "Instructor or Teacher" },
        { label: "Intern", value: "Intern" },
        { label: "Other", value: "Other" },
    ];

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="create-profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Create Your Profile</h1>
                        <p className="lead text-center">
                            Let's get some information to make your profile stand out
                        </p>
                        {errorMsg && (
                            <>
                                <br /> <p style={{ color: "red" }}>{errorMsg}</p>
                                <br />
                            </>
                        )}
                        <small className="d-block pb3">* = required fields</small>
                        <form onSubmit={onSubmit}>
                            <TextFieldGroup
                                placeholder="* Profile Handle"
                                name="handle"
                                value={state.handle}
                                onChange={onChange}
                                error={state.errors.handle}
                                info="A unique handle for your profile URL. Your full name, company name, nickname"
                            />
                            <SelectListGroup
                                placeholder="* Status"
                                name="status"
                                value={state.status}
                                onChange={onChange}
                                options={options}
                                error={state.errors.status}
                                info="Give us an idea of where you are at in your career"
                            />
                            <TextFieldGroup
                                placeholder="Company"
                                name="company"
                                value={state.company}
                                onChange={onChange}
                                error={state.errors.company}
                                info="Could be your own company or one you work for"
                            />
                            <TextFieldGroup
                                placeholder="Website"
                                name="website"
                                value={state.website}
                                onChange={onChange}
                                error={state.errors.website}
                                info="could be your own website or a company one"
                            />
                            <TextFieldGroup
                                placeholder="Location"
                                name="location"
                                value={state.location}
                                onChange={onChange}
                                error={state.errors.location}
                                info="City or city & state suggested (eg. Panipat, Haryana)"
                            />
                            <TextFieldGroup
                                placeholder="* Skills"
                                name="skills"
                                value={state.skills}
                                onChange={onChange}
                                error={state.errors.skills}
                                info="Please provide comma separated values (eg.
                              HTML,CSS,JavaScript,PHP)"
                            />
                            <TextFieldGroup
                                placeholder="Github Username"
                                name="githubUsername"
                                value={state.githubUsername}
                                onChange={onChange}
                                error={state.errors.githubUsername}
                                info="If you want your latest repos and a Github link, provide your username"
                            />
                            <TextAreaFieldGroup
                                placeholder="Short Bio"
                                name="bio"
                                value={state.bio}
                                onChange={onChange}
                                error={state.errors.bio}
                                info="Tell us a little about yourself"
                            />
                            <div className="mb-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setState((prevState) => ({
                                            ...prevState,
                                            displaySocialInputs: !prevState.displaySocialInputs,
                                        }));
                                    }}
                                    className="btn btn-light"
                                >
                                    Add Social Network Links
                                </button>
                                <span className="text-muted">Optional</span>
                            </div>
                            {socialInputs}
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

export default CreateProfile;
