import React, { useState, useRef } from "react";
import logo from "../assets/logo.png";

export default function Navigation(props) {
    const [details, setDetails] = useState({ user: "", pin: "" });
    const mainRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prevVal) => {
            return {
                ...prevVal,
                [name]: value,
            };
        });
    };

    const handleSubmit = (e) => {
        props.validate(details.user, details.pin);
        setDetails({ user: "", pin: "" });
        mainRef.current.blur();
        e.preventDefault();
    };

    return (
        <nav>
            <p className="welcome">
                {props.login.display
                    ? `Welcome Back, ${props.ownerName}`
                    : props.login.error
                    ? `Wrong Credentials, Try Again!`
                    : `Login to get started`}
            </p>
            <img src={logo} alt="Logo" className="logo" />
            <form className="login" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="user"
                    className="login__input login__input--user"
                    name="user"
                    onChange={handleChange}
                    value={details.user}
                    ref={mainRef}
                    autoComplete="off"
                />

                <input
                    type="password"
                    placeholder="PIN"
                    maxLength="4"
                    className="login__input login__input--pin"
                    name="pin"
                    onChange={handleChange}
                    value={details.pin}
                    ref={mainRef}
                    autoComplete="off"
                />
                <button className="login__btn">&rarr;</button>
            </form>
        </nav>
    );
}
