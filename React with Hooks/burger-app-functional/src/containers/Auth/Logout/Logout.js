import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { authLogout } from "../../../redux/actions/index";

const Logout = (props) => {
    useEffect(() => {
        props.onLogout();
    }, []);

    return <Redirect to="/" />;
};

const mapDispatchToProps = {
    onLogout: authLogout,
};

export default connect(null, mapDispatchToProps)(Logout);
