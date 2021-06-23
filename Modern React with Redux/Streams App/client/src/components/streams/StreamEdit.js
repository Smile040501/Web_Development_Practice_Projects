import React, { Component } from "react";
import { connect } from "react-redux";

import StreamForm from "./StreamForm.js";
import { fetchStream, editStream } from "../../redux/actions/index.js";

class StreamEdit extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.stream.id, formValues);
    };

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm
                    onSubmit={this.onSubmit}
                    initialValues={{
                        title: this.props.stream.title,
                        description: this.props.stream.description,
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        stream: state.streams[props.match.params.id],
    };
};

const mapDispatchToProps = {
    fetchStream,
    editStream,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamEdit);
