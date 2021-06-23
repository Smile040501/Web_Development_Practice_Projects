import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Blog from "./containers/Blog/Blog.jsx";

class App extends Component {
    state = { showPosts: false };

    modeHandler = () => {
        this.setState((prevState) => {
            return { showPosts: !prevState.showPosts };
        });
    };

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Blog />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
