import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";

import { selectAuthUser } from "../../redux/selector";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = useSelector(selectAuthUser, shallowEqual);

    return (
        <Route
            {...rest}
            render={(props) => (user ? <Component {...props} /> : <Redirect to="/login" />)}
        />
    );
};

export default PrivateRoute;
