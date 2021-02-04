import React from "react";
import classnames from "classnames";

export default function Header(props) {
    return (
        <header>
            <h1>Guess My Number!</h1>
            <p className="between">{`(Between 1 and ${props.maxNum})`}</p>
            <form onSubmit={props.reset}>
                <button className="btn again">Again!</button>
            </form>
            <div className={classnames("number", props.expand ? "number-expand" : "")}>
                {props.display ? props.randNum : "?"}
            </div>
        </header>
    );
}
