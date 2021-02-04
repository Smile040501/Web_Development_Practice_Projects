import React from "react";

export default function MovementsRow(props) {
    const type = props.mov?.amount > 0 ? `deposit` : `withdrawal`;
    const date = new Date(props.mov?.date);
    const amount = props.mov?.amount?.toFixed(2);

    const dateString = () => {
        const daysPassed = Math.round(Math.abs((new Date() - date) / (1000 * 60 * 60 * 24)));
        if (daysPassed === 0) {
            return `Today`;
        } else if (daysPassed === 1) {
            return `Yesterday`;
        } else if (daysPassed <= 7) {
            return `${daysPassed} days ago`;
        } else {
            const options = {
                day: `numeric`,
                month: `numeric`,
                year: `numeric`,
            };
            return new Intl.DateTimeFormat(props.locale, options).format(date);
        }
    };

    const amtString = () => {
        const options = {
            style: "currency",
            currency: props.currency,
        };
        return new Intl.NumberFormat(props.locale, options).format(amount);
    };

    return (
        <div className="movements__row">
            <div className={`movements__type movements__type--${type}`}>
                {`${props.index + 1} ${type}`}
            </div>
            <div className="movements__date">{dateString()}</div>
            <div className="movements__value">{amtString()}</div>
        </div>
    );
}
