'use strict'
const express = require('express');
const axios = require('axios');
// const weather = require('./data/weather.json')
require('dotenv').config();
const app = express()
const cors = require('cors');
app.use(cors())
let handleWeather = async (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const key = req.query.key;
    //`http://api.weatherbit.io/v2.0/forecast/daily?lat=31&lon=35&key=09b034f885484632854c033f1e72519d`
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${key}`
    let axiosResponse = await axios.get(url)
    let weatherData = axiosResponse.data.data;
    let ForecastObj = weatherData.map(city =>
        new Forecast(city.valid_date, city.weather.description)
    )
    res.status(200).send(ForecastObj)
}
class Forecast {
    constructor(valid_date, description) {
        this.valid_date = valid_date
        this.description = description
    }
}
console.log('hello from weather')
module.exports = { Forecast, handleWeather };
