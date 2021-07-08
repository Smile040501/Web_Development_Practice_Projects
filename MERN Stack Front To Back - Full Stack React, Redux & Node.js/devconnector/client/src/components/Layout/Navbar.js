import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { authLogout, clearCurrentProfile } from "../../redux/actions/index";
import { selectAuthUser } from "../../redux/selector";

const Navbar = () => {
    const user = useSelector(selectAuthUser, shallowEqual);
    const dispatch = useDispatch();

    const onLogoutClick = (e) => {
        e.preventDefault();
        dispatch(clearCurrentProfile());
        dispatch(authLogout());
    };

    const authLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/feed">
                    Post Feed
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                    Dashboard
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/logout" onClick={onLogoutClick} className="nav-link">
                    {user && (
                        <img
                            className="rounded-circle"
                            src={user.avatar}
                            alt={user.name}
                            style={{ width: "25px", marginRight: "5px" }}
                            title="You must have a Gravatar connected to your email to display an image"
                        />
                    )}
                    Logout
                </Link>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/register">
                    Sign Up
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">
                    Login
                </Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    DevConnector
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#mobile-nav"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/profiles">
                                Developers
                            </Link>
                        </li>
                    </ul>
                    {user ? authLinks : guestLinks}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
