'use strict'
const express = require('express');
const axios = require('axios');
const weather = require('./data/weather.json')
require('dotenv').config();
const app = express()
const cors = require('cors');
app.use(cors())

let weatherData = []
let ForecastObj = []
app.get('/weather',
    (req, res) => {
        const lat = req.query.lat;
        const lon = req.query.lon;
        const searchQuery = req.query.searchQuery;


        (lat && lon && searchQuery) ?
            (weatherData = weather.find(city => {
                return city.city_name === searchQuery

            }
            ),
                ForecastObj = weatherData.data.map(city =>
                    new Forecast(city.valid_date, city.weather.description)
                )

                ,
                res.status(200).json(ForecastObj)

            )
            : res.status(500).send(" error")


    })

app.listen(process.env.REACT_APP_PORT, () => console.error(`listen to the server`))

class Forecast {
    constructor(valid_date, description) {
        this.valid_date = valid_date
        this.description = description
    }
}
