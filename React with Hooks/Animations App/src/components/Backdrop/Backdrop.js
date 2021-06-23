import React from "react";

import "./Backdrop.css";

const Backdrop = (props) => {
    const classes = ["Backdrop", props.show ? "BackdropOpen" : "BackdropClosed"].join(" ");

    return <div className={classes}></div>;
};

export default Backdrop;
