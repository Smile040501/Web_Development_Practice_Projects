import React, { useState } from "react";

export default function Transfer(props) {
    const [transferDetails, setTransferDetails] = useState({ userName: "", amount: "" });
    const changeTransferDetails = (e) => {
        const { name, value } = e.target;
        setTransferDetails((prevVal) => {
            return {
                ...prevVal,
                [name]: value,
            };
        });
    };
    const transferMoney = (e) => {
        props.transfer(transferDetails.userName, transferDetails.amount);
        setTransferDetails({ userName: "", amount: "" });
        e.preventDefault();
    };

    return (
        <div className="operation operation--transfer">
            <h2>Transfer money</h2>
            <form className="form form--transfer" onSubmit={transferMoney}>
                <input
                    type="text"
                    className="form__input form__input--to"
                    name="userName"
                    value={transferDetails.userName}
                    onChange={changeTransferDetails}
                    autoComplete="off"
                />
                <input
                    type="number"
                    className="form__input form__input--amount"
                    name="amount"
                    value={transferDetails.amount}
                    onChange={changeTransferDetails}
                    autoComplete="off"
                />
                <button className="form__btn form__btn--transfer">&rarr;</button>
                <label className="form__label">Transfer to</label>
                <label className="form__label">Amount</label>
            </form>
        </div>
    );
}
