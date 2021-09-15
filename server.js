'use strict'
const express = require('express');
const axios = require('axios');
// const weather = require('./data/weather.json')
require('dotenv').config();
const app = express()
const cors = require('cors');
app.use(cors())
const w = require('./weather.js')
const m = require('./movie.js')
/*
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


// console.log('hello from weather')
*/
app.get('/weather', w.handleWeather)


// class Movie {
//     constructor(title, overview, average_votes, total_votes, image_url, released_on) {
//         this.title = title
//         this.overview = overview
//         this.average_votes = average_votes
//         this.total_votes = total_votes
//         this.image_url = image_url
//         this.released_on = released_on
//     }
// }


// let showMovie = async (req, res) => {
//     const api_key = req.query.api_key;
//     const query = req.query.query;

//     let url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`;
//     let response = await axios.get(url);
//     let movieData = response.data.results;
//     let MovieObj = movieData.map(m =>
//         new Movie(m.title, m.overview, m.vote_average, m.vote_count, m.poster_path, m.release_date)
//     )
//     res.status(200).json(MovieObj);
// }

app.get('/movies', m.showMovie)

app.listen(process.env.REACT_APP_PORT, () => console.error(`listen to the server`))

