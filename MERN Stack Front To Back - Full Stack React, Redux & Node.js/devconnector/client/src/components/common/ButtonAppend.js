import React from "react";

const ButtonAppend = ({ onClick, display }) => {
    return (
        <div className="input-group-append">
            <button onClick={onClick} className="btn btn-outline-secondary" type="button">
                {display ? "HIDE" : "SHOW"}
            </button>
        </div>
    );
};

export default ButtonAppend;
