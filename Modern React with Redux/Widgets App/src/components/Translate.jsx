import React, { useState } from "react";
import Dropdown from "./Dropdown.jsx";
import Convert from "./Convert.jsx";

const options = [
    {
        label: "Afrikaans",
        value: "af",
    },
    {
        label: "Arabic",
        value: "ar",
    },
    {
        label: "Chinese",
        value: "zh-CN",
    },
    {
        label: "Dutch",
        value: "nl",
    },
    {
        label: "English",
        value: "en",
    },
    {
        label: "French",
        value: "fr",
    },
    {
        label: "German",
        value: "de",
    },
    {
        label: "Hindi",
        value: "hi",
    },
];

export default function Translate() {
    const [language, setLanguage] = useState(options[0]);
    const [text, setText] = useState("");

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label htmlFor="inputText">Enter Text</label>
                    <input
                        id="inputText"
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
            </div>
            <Dropdown
                label="Select a Language"
                options={options}
                selected={language}
                onSelectedChange={setLanguage}
            />
            <hr />
            <h3 className="ui header">Output</h3>
            <Convert text={text} language={language} />
        </div>
    );
}
