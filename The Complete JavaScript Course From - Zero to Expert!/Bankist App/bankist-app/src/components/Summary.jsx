import React from "react";

export default function Summary(props) {
    const sortMovements = (e) => {
        props.sortMovements();
        e.preventDefault();
    };

    const currencyCode = props.acc?.currency ? props.acc.currency : "USD";

    const amtString = (amt) => {
        const options = {
            style: "currency",
            currency: currencyCode,
        };
        return new Intl.NumberFormat(props.acc?.locale, options).format(amt);
    };

    return (
        <div className="summary">
            <p className="summary__label">In</p>
            <p className="summary__value summary__value--in">
                {amtString(props.acc?.summary?.deposit?.toFixed(2))}
            </p>
            <p className="summary__label">Out</p>
            <p className="summary__value summary__value--out">
                {amtString(props.acc?.summary?.withdrawal?.toFixed(2))}
            </p>
            <p className="summary__label">Interest</p>
            <p className="summary__value summary__value--interest">
                {amtString(props.acc?.summary?.interest?.toFixed(2))}
            </p>
            <form onSubmit={sortMovements}>
                <button className="btn--sort">&darr; SORT</button>
            </form>
        </div>
    );
}
