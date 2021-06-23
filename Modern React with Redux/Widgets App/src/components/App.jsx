import React, { useState } from "react";
import Header from "./Header.jsx";
import Route from "./Route.jsx";
import Accordion from "./Accordion.jsx";
import Search from "./Search.jsx";
import Dropdown from "./Dropdown.jsx";
import Translate from "./Translate.jsx";

const items = [
    {
        title: "What is React?",
        content: "React is a frontend javascript framework",
    },
    {
        title: "Why use React?",
        content: "React is a favorite JS library among engineers",
    },
    {
        title: "How do you use React",
        content: "You use React by creating components",
    },
];

const options = [
    {
        label: "The Color Red",
        value: "red",
    },
    {
        label: "The Color Green",
        value: "green",
    },
    {
        label: "The Color Blue",
        value: "blue",
    },
];

export default function App() {
    const [selected, setSelected] = useState(options[0]);

    return (
        <div>
            <Header />
            <Route path="/">
                <Accordion items={items} />
            </Route>
            <Route path="/list">
                <Search />
            </Route>
            <Route path="/dropdown">
                <Dropdown
                    label="Select a Color"
                    options={options}
                    selected={selected}
                    onSelectedChange={setSelected}
                />
            </Route>
            <Route path="/translate">
                <Translate />
            </Route>
        </div>
    );
}
