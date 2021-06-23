import React, { useState } from "react";

export default function Close(props) {
    const [closeAccDetails, setCloseAccDetails] = useState({ userName: "", pin: "" });
    const changeCloseAccDetails = (e) => {
        const { name, value } = e.target;
        setCloseAccDetails((prevVal) => {
            return {
                ...prevVal,
                [name]: value,
            };
        });
    };
    const closeAcc = (e) => {
        props.closeAcc(closeAccDetails.userName, closeAccDetails.pin);
        setCloseAccDetails({ userName: "", pin: "" });
        e.preventDefault();
    };

    return (
        <div className="operation operation--close" onSubmit={closeAcc}>
            <h2>Close account</h2>
            <form className="form form--close">
                <input
                    type="text"
                    className="form__input form__input--user"
                    name="userName"
                    value={closeAccDetails.userName}
                    onChange={changeCloseAccDetails}
                    autoComplete="off"
                />
                <input
                    type="password"
                    maxLength="6"
                    className="form__input form__input--pin"
                    name="pin"
                    value={closeAccDetails.pin}
                    onChange={changeCloseAccDetails}
                    autoComplete="off"
                />
                <button className="form__btn form__btn--close">&rarr;</button>
                <label className="form__label">Confirm User</label>
                <label className="form__label">Confirm PIN</label>
            </form>
        </div>
    );
}
