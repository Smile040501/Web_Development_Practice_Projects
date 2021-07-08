import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem";
import { fetchProfiles } from "../../redux/actions/index";
import {
    selectProfiles,
    selectProfilesLoading,
    selectProfilesErrorMsg,
} from "../../redux/selector";

const Profiles = () => {
    const profiles = useSelector(selectProfiles, shallowEqual);
    const loading = useSelector(selectProfilesLoading, shallowEqual);
    const errorMsg = useSelector(selectProfilesErrorMsg, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProfiles());
    }, [dispatch]);

    let profileItems;

    if (loading) {
        profileItems = <Spinner />;
    } else {
        if (profiles && profiles.length > 0) {
            profileItems = profiles.map((profile) => (
                <ProfileItem key={profile.id.toString()} profile={profile} />
            ));
        } else if (errorMsg) {
            profileItems = <h5 style={{ color: "red" }}>{errorMsg}</h5>;
        } else {
            profileItems = <h4>No profiles found...</h4>;
        }
    }

    return (
        <div className="profiles">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center">Developer Profiles</h1>
                        <p className="lead text-center">Browse and connect with developers</p>
                        {profileItems}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profiles;
