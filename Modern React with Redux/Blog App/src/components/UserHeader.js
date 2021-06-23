import React, { Component } from "react";
import { connect } from "react-redux";

class UserHeader extends Component {
    render() {
        const { user } = this.props;
        if (!user) {
            return null;
        }
        return <div className="header">{user.name}</div>;
    }
}

const mapStateToProps = (state, props) => {
    return {
        user: state.users.find((user) => user.id === props.userId),
    };
};

export default connect(mapStateToProps)(UserHeader);
