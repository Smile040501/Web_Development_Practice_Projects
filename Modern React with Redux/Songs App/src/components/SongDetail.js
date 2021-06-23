import React from "react";
import { connect } from "react-redux";

function SongDetail({ song }) {
    return song ? (
        <div>
            <h3>Details for:</h3>
            <p>
                Title: {song.title} <br />
                Duration: {song.duration}
            </p>
        </div>
    ) : (
        <div>Select a Song</div>
    );
}

const mapStateToProps = (state) => {
    return { song: state.selectedSong };
};

export default connect(mapStateToProps)(SongDetail);
