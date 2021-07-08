import React from "react";

const SelectListGroup = ({ options, error, name, value, onChange, info }) => {
    const selectOptions = options.map((option) => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ));

    return (
        <div className="form-group">
            <select
                className={["form-control form-control-lg", error ? "is-invalid" : ""].join(" ")}
                autoComplete="off"
                name={name}
                value={value}
                onChange={onChange}
            >
                {selectOptions}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
            {info && <small className="form-text text-muted">{info}</small>}
        </div>
    );
};

export default SelectListGroup;
