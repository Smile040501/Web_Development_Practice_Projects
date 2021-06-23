// reach this file at domain/auth
// Automatically implemented routing and lazy loading
import React from "react";

import User from "../../components/User";

const AuthIndexPage = (props) => (
    <div>
        <h1>The Auth Index Page of {props.appName}</h1>
        <User name="Tester" age="100" />
    </div>
);

AuthIndexPage.getInitialProps = async (context) => {
    console.log(context);
    // Can be used to do initial data loading as it runs on server first
    return { appName: "Next App [Auth Index]" };
};

export default AuthIndexPage;
