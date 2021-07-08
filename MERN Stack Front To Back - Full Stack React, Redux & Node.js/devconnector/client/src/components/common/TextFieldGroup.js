import React, { useState } from "react";

import ButtonAppend from "./ButtonAppend";
import IconPrepend from "./IconPrepend";

const TextFieldGroup = ({
    hasButton,
    hasIcon,
    icon,
    type,
    error,
    placeholder,
    autoComplete,
    name,
    value,
    onChange,
    disabled,
    info,
}) => {
    const [display, setDisplay] = useState(false);

    const handleClick = () => {
        setDisplay((prevVal) => !prevVal);
    };

    return (
        <div className="form-group">
            <div className={`${hasButton || hasIcon ? "input-group mb-3" : ""}`}>
                {hasIcon && <IconPrepend icon={icon} />}
                <input
                    type={display ? "text" : type}
                    className={["form-control form-control-lg", error ? "is-invalid" : ""].join(
                        " "
                    )}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />
                {hasButton && <ButtonAppend onClick={handleClick} toggle={display} />}
                {error && <div className="invalid-feedback">{error}</div>}
                {info && <small className="form-text text-muted">{info}</small>}
            </div>
        </div>
    );
};

export default TextFieldGroup;
