import React, { Component } from "react";

export default class GoogleMap extends Component {
    constructor(props) {
        super(props);

        this.mapRef = React.createRef();
    }

    componentDidMount() {
        console.log(this.props.lat, this.props.lon, this.mapRef);
        new window.google.maps.Map(this.mapRef.current, {
            zoom: 12,
            center: {
                lat: this.props.lat,
                lng: this.props.lon,
            },
        });
    }

    render() {
        return <div ref={this.mapRef} />;
    }
}
