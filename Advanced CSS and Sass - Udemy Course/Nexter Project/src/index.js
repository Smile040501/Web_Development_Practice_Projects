import React from "react";
import ReactDOM from "react-dom";

import "./stylesheets/main.scss";

import App from "./components/App.jsx";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
