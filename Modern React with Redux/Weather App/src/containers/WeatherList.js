import React, { Component } from "react";
import { connect } from "react-redux";

import GoogleMap from "../components/GoogleMap";
import Chart from "../components/Chart";

class WeatherList extends Component {
    renderWeather = (cityData) => {
        const { id } = cityData.city;
        const temperatureArr = cityData.list.map((weather) => weather.main.temp);
        const pressureArr = cityData.list.map((weather) => weather.main.pressure);
        const humidityArr = cityData.list.map((weather) => weather.main.humidity);
        const { lon, lat } = cityData.city.coord;

        return (
            <tr key={id}>
                <td>
                    <GoogleMap lat={lat} lon={lon} />
                </td>
                <td>
                    <Chart data={temperatureArr} color="orange" unit="K" />
                </td>
                <td>
                    <Chart data={pressureArr} color="green" unit="hPa" />
                </td>
                <td>
                    <Chart data={humidityArr} color="black" unit="%" />
                </td>
            </tr>
        );
    };

    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature (K)</th>
                        <th>Pressure (hPa)</th>
                        <th>Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>{this.props.weather.map(this.renderWeather)}</tbody>
            </table>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        weather: state.weather,
    };
};

export default connect(mapStateToProps)(WeatherList);
