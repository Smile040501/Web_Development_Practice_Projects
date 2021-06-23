import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Modal from "../Modal";
import history from "../../shared/history";
import { deleteStream, fetchStream } from "../../redux/actions/index";

class StreamDelete extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions = () => {
        return (
            <>
                <button
                    onClick={() => this.props.deleteStream(this.props.stream.id)}
                    className="ui button negative"
                >
                    Delete
                </button>
                <Link to="/" className="ui button">
                    Cancel
                </Link>
            </>
        );
    };

    renderContent() {
        if (!this.props.stream) {
            return "Are you sure you want to delete this stream?";
        }

        return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`;
    }

    render() {
        return (
            <Modal
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push("/")}
            />
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        stream: state.streams[props.match.params.id],
    };
};

const mapDispatchToProps = {
    deleteStream,
    fetchStream,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamDelete);
