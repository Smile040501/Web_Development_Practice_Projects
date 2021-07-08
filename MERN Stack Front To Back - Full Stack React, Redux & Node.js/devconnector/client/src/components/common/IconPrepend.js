import React from "react";

const IconPrepend = ({ icon }) => {
    return (
        <div className="input-group-prepend">
            <span className="input-group-text">
                <i className={icon} />
            </span>
        </div>
    );
};

export default IconPrepend;
