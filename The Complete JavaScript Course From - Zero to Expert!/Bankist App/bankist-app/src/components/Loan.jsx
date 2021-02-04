import React, { useState } from "react";

export default function Loan(props) {
    const [loan, setLoan] = useState("");
    const changeLoan = (e) => {
        const { value } = e.target;
        setLoan(value);
    };
    const takeLoan = (e) => {
        props.takeLoan(loan);
        setLoan("");
        e.preventDefault();
    };

    return (
        <div className="operation operation--loan">
            <h2>Request loan</h2>
            <form className="form form--loan" onSubmit={takeLoan}>
                <input
                    type="number"
                    className="form__input form__input--loan-amount"
                    value={loan}
                    onChange={changeLoan}
                    autoComplete="off"
                />
                <button className="form__btn form__btn--loan">&rarr;</button>
                <label className="form__label form__label--loan">Amount</label>
            </form>
        </div>
    );
}
