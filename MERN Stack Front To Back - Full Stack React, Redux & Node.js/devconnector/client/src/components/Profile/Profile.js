import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import Spinner from "../common/Spinner";
import { fetchProfileByHandle } from "../../redux/actions/index";
import { selectProfile, selectProfilesErrorMsg, selectProfilesLoading } from "../../redux/selector";

const Profile = (props) => {
    const profile = useSelector(selectProfile, shallowEqual);
    const errorMsg = useSelector(selectProfilesErrorMsg, shallowEqual);
    const loading = useSelector(selectProfilesLoading, shallowEqual);
    const dispatch = useDispatch();

    const { handle } = props.match.params;

    useEffect(() => {
        if (handle) {
            dispatch(fetchProfileByHandle(handle));
        }
    }, [dispatch, handle]);

    let profileContent;
    if (loading) {
        profileContent = <Spinner />;
    } else if (profile) {
        profileContent = (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/profiles" className="btn btn-light mb-3 float-left">
                            Back To Profiles
                        </Link>
                    </div>
                    <div className="col-md-6" />
                </div>
                <ProfileHeader profile={profile} />
                <ProfileAbout profile={profile} />
                <ProfileCreds education={profile.education} experience={profile.experience} />
                {profile.githubUsername ? (
                    <ProfileGithub username={profile.githubUsername} />
                ) : null}
            </div>
        );
    } else if (errorMsg) {
        profileContent = <h3 style={{ color: "red" }}>No Profile Found</h3>;
    }

    return (
        <div className="profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">{profileContent}</div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
