import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";
import { fetchCurrentUserProfile, deleteAccount } from "../../redux/actions/index";
import { selectProfile, selectAuthUser, selectProfilesLoading } from "../../redux/selector";

const Dashboard = () => {
    const profile = useSelector(selectProfile, shallowEqual);
    const user = useSelector(selectAuthUser, shallowEqual);
    const loading = useSelector(selectProfilesLoading, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrentUserProfile());
    }, [dispatch]);

    const onDeleteClick = () => {
        dispatch(deleteAccount());
    };

    let dashboardContent;
    if (loading) {
        dashboardContent = <Spinner />;
    } else {
        // Check if logged in user has profile data
        if (profile && Object.keys(profile).length > 0) {
            dashboardContent = (
                <div>
                    <p className="lead text-muted">
                        Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                    </p>
                    <ProfileActions />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />
                    <div style={{ marginBottom: "60px" }}>
                        <button onClick={onDeleteClick} className="btn btn-danger">
                            Delete My Account
                        </button>
                    </div>
                </div>
            );
        } else {
            // User is logged in but has no profile
            dashboardContent = (
                <div>
                    <p className="lead text-muted">Welcome {user.name}</p>
                    <p>You have not yet setup a profile, please add some info</p>
                    <Link to="/create-profile" className="btn btn-lg btn-info">
                        Create Profile
                    </Link>
                </div>
            );
        }
    }

    return (
        <div className="dashboard">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4">Dashboard</h1>
                        {dashboardContent}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
