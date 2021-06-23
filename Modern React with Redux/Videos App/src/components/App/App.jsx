import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";
import VideoDetail from "../VideoDetail/VideoDetail.jsx";
import VideoList from "../VideoList/VideoList.jsx";
import youtube from "../../apis/youtube.jsx";

export default class App extends Component {
    state = {
        videos: [],
        selectedVideo: null,
    };

    componentDidMount() {
        this.onTermSubmit("home");
    }

    onTermSubmit = async (term) => {
        const res = await youtube.get("/search", {
            params: {
                q: term,
            },
        });
        this.setState({ videos: res.data.items, selectedVideo: res.data.items[0] });
    };

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video });
    };

    render() {
        return (
            <div className="ui container">
                <SearchBar onFormSubmit={this.onTermSubmit} />
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column">
                            <VideoList
                                onVideoSelect={this.onVideoSelect}
                                videos={this.state.videos}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
