import React, { Component } from "react";
import { connect } from "react-redux";

import StreamForm from "./StreamForm";
import { createStream } from "../../redux/actions/index";

class StreamCreate extends Component {
    onSubmit = (formValues) => {
        this.props.createStream(formValues, this.props.userId);
    };

    render() {
        return (
            <div>
                <h3>Create a Stream</h3>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}
const mapStateToProps = (state, props) => {
    return {
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = {
    createStream,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamCreate);
