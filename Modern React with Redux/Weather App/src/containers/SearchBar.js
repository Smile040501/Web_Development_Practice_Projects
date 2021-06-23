import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchWeather } from "../redux/actions/index";

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { term: "" };
    }

    onInputChange = (e) => {
        this.setState({ term: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.fetchWeather(this.state.term);
        this.setState({ term: "" });
    };

    render() {
        return (
            <form className="input-group mb-3" onSubmit={this.onSubmit}>
                <input
                    value={this.state.term}
                    placeholder="Get a five-day forecast in your favorite cities"
                    className="form-control"
                    onChange={this.onInputChange}
                />
                <button className="btn btn-outline-primary" type="submit">
                    Submit
                </button>
            </form>
        );
    }
}

const mapDispatchToProps = {
    fetchWeather,
};

export default connect(null, mapDispatchToProps)(SearchBar);
