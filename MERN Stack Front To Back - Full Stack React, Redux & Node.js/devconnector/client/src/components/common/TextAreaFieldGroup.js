import React from "react";

const TextAreaFieldGroup = ({ hasButton, error, placeholder, name, value, onChange, info }) => {
    return (
        <div className="form-group">
            <div className={`${hasButton ? "input-group mb-3" : ""}`}>
                <textarea
                    className={["form-control form-control-lg", error ? "is-invalid" : ""].join(
                        " "
                    )}
                    placeholder={placeholder}
                    autoComplete="off"
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                {error && <div className="invalid-feedback">{error}</div>}
                {info && <small className="form-text text-muted">{info}</small>}
            </div>
        </div>
    );
};

export default TextAreaFieldGroup;
