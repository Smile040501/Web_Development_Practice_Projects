import React, { useState, useEffect, useRef } from "react";

export default function Dropdown({ label, options, selected, onSelectedChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const onBodyClick = (e) => {
            if (ref.current && ref.current.contains(e.target)) {
                return;
            }
            setOpen(false);
        };

        document.body.addEventListener("click", onBodyClick);

        return () => {
            document.body.removeEventListener("click", onBodyClick);
        };
    }, []);

    const renderedOptions = options.map((option) => {
        if (option.value === selected.value) {
            return null;
        }

        return (
            <div key={option.value} className="item" onClick={() => onSelectedChange(option)}>
                {option.label}
            </div>
        );
    });

    return (
        <div className="ui form" ref={ref}>
            <div className="field">
                <label htmlFor="" className="label">
                    {label}
                </label>
                <div
                    className={`ui selection dropdown ${open ? "visible active" : ""}`}
                    onClick={() =>
                        setOpen((prevVal) => {
                            return !prevVal;
                        })
                    }
                >
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${open ? "visible transition" : ""}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    );
}
