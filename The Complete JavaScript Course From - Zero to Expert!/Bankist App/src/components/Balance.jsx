import React from "react";

export default function Balance(props) {
    const options = {
        hour: `numeric`,
        minute: `numeric`,
        day: `numeric`,
        month: `numeric`,
        year: `numeric`,
    };

    const { currency: currencyCode = "USD" } = props.acc;

    const amtString = () => {
        const options = {
            style: "currency",
            currency: currencyCode,
        };
        return new Intl.NumberFormat(props.acc?.locale, options).format(
            props.acc?.balance?.toFixed(2)
        );
    };

    return (
        <div className="balance">
            <div>
                <p className="balance__label">Current balance</p>
                <p className="balance__date">
                    As of{" "}
                    <span className="date">
                        {new Intl.DateTimeFormat(props.acc?.locale, options).format(new Date())}
                    </span>
                </p>
            </div>
            <p className="balance__value">{amtString()}</p>
        </div>
    );
}
