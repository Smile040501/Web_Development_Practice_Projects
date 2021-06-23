require("dotenv").config();
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const app = express();

let latitude = "";
let longitude = "";
const apiKey = process.env.API_KEY;
const unit = "metric";

app.set("view engine", "ejs");
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("home");
});

app.post("/", function (req, res) {
    const cityName = req.body.cityName;
    const url =
        "https://api.openweathermap.org/data/2.5/weather?appid=" +
        apiKey +
        "&q=" +
        cityName +
        "&units=" +
        unit +
        "";

    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            if (weatherData.cod === 200) {
                latitude = weatherData.coord.lat;
                longitude = weatherData.coord.lon;

                let sunriseTime = new Date(weatherData.sys.sunrise * 1000);
                const sunrise =
                    sunriseTime.getHours() +
                    ":" +
                    sunriseTime.getMinutes() +
                    ":" +
                    sunriseTime.getSeconds() +
                    "";

                let sunsetTime = new Date(weatherData.sys.sunset * 1000);
                const sunset =
                    sunsetTime.getHours() +
                    ":" +
                    sunsetTime.getMinutes() +
                    ":" +
                    sunsetTime.getSeconds() +
                    "";

                const imageURL =
                    "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
                res.render("weather", {
                    cityId: weatherData.id,
                    appId: apiKey,
                    cityName: cityName,
                    weatherDescription: _.startCase(weatherData.weather[0].description),
                    imageURL: imageURL,
                    weatherTemperature: weatherData.main.temp,
                    sunrise: sunrise,
                    sunset: sunset,
                    weatherTemperatureMax: weatherData.main.temp_max,
                    weatherTemperatureMin: weatherData.main.temp_min,
                });
            } else {
                res.send("Enter correct city name");
            }
        });
    });
});

app.post("/forecast", function (req, res) {
    const url =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&units=" +
        unit +
        "&appid=" +
        apiKey +
        "";
    https.get(url, function (response) {
        response.on("data", function (data) {
            const forecastData = JSON.parse(data);
            const dailyData = forecastData.daily;
            dailyData.forEach(function (daily) {
                daily.weather[0].description = _.startCase(daily.weather[0].description);
            });
            res.render("forecast", {
                dailyData: dailyData,
            });
        });
    });
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
