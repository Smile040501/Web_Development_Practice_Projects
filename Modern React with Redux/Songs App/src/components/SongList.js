import React, { Component } from "react";
import { connect } from "react-redux";

import { selectSong } from "../actions/index";

class SongList extends Component {
    renderList() {
        return this.props.songs.map((song) => {
            return (
                <div className="item" key={song.title}>
                    <div className="right floated content">
                        <button
                            onClick={() => this.props.selectSong(song)}
                            className="ui button primary"
                        >
                            Select
                        </button>
                    </div>
                    <div className="content">{song.title}</div>
                </div>
            );
        });
    }

    render() {
        return <div className="ui divided list">{this.renderList()}</div>;
    }
}

// To map state inside redux store to props so that we can later access them
// state is the state from redux store
// Convention: to give this name
// Every time we change our redux state, this function will be executed again and all the components rendered using connect() will re-render
const mapStateToProps = (state) => {
    return {
        // object that can be then accessed on props object
        // ex: this.props.songs
        // if we are also passing some props to Component, they will be merged
        // dispatch function will also get added to this.props.dispatch
        songs: state.songs,
    };
};

// Second object are the action creators
// Providing second object, the dispatch function wont be available on this.props

// Why can't we call actionCreator directly?
// Redux doesn't automatically detect action creators being called
// Redux doesn't automatically detect a function returning an object that is an 'action'
// If we call manually action creator, we have to call dispatch function on our own
// Doing the below way, after calling this action creator through this.props, redux will automatically dispatch the action returned by it

export default connect(mapStateToProps, {
    selectSong,
})(SongList);
