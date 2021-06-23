import React from "react";

export default function Timer(props) {
    return (
        <p className="logout-timer">
            You will be logged out in{" "}
            <span className="timer">{`${props.displayTime.min}:${props.displayTime.sec}`}</span>
        </p>
    );
}
