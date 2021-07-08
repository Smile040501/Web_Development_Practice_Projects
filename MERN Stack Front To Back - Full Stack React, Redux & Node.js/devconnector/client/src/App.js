import React, { Suspense, useEffect } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import Navbar from "./components/Layout/Navbar";
import Landing from "./components/Layout/Landing";
import Footer from "./components/Layout/Footer";
import Spinner from "./components/common/Spinner";
import { selectAuthUser } from "./redux/selector";
import { authCheckState } from "./redux/actions/index";
import "./App.css";

const Register = React.lazy(() => import("./components/auth/Register"));
const Login = React.lazy(() => import("./components/auth/Login"));
const Dashboard = React.lazy(() => import("./components/Dashboard/Dashboard"));
const CreateProfile = React.lazy(() => import("./components/CreateProfile/CreateProfile"));
const EditProfile = React.lazy(() => import("./components/EditProfile/EditProfile"));
const AddExperience = React.lazy(() => import("./components/addCredentials/AddExperience"));
const AddEducation = React.lazy(() => import("./components/addCredentials/AddEducation"));
const Profiles = React.lazy(() => import("./components/Profiles/Profiles"));
const Profile = React.lazy(() => import("./components/Profile/Profile"));
const Posts = React.lazy(() => import("./components/Posts/Posts"));
const Post = React.lazy(() => import("./components/Post/Post"));

const App = (props) => {
    const user = useSelector(selectAuthUser, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authCheckState());
    }, [dispatch]);

    let routes;
    if (!user) {
        routes = (
            <Switch>
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route path="/profiles" exact component={Profiles} />
                <Route path="/profile/:handle" exact component={Profile} />
                <Redirect to="/login" />
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path="/profiles" exact component={Profiles} />
                <Route path="/profile/:handle" exact component={Profile} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/create-profile" exact component={CreateProfile} />
                <Route path="/edit-profile" exact component={EditProfile} />
                <Route path="/add-experience" exact component={AddExperience} />
                <Route path="/add-education" exact component={AddEducation} />
                <Route path="/feed" exact component={Posts} />
                <Route path="/post/:id" exact component={Post} />
                <Redirect to="/dashboard" />
            </Switch>
        );
    }

    return (
        <div className="App">
            <Navbar />
            {props.location.pathname === "/" ? (
                <Route exact path="/" component={Landing} />
            ) : (
                <div className="container">
                    <Suspense
                        fallback={
                            <div style={{ textAlign: "center" }}>
                                <Spinner />
                            </div>
                        }
                    >
                        {routes}
                    </Suspense>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default withRouter(App);
