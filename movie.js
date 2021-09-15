'use strict'
const express = require('express');
const axios = require('axios');
// const weather = require('./data/weather.json')
require('dotenv').config();
const app = express()
const cors = require('cors');
app.use(cors())
class Movie {
    constructor(title, overview, average_votes, total_votes, image_url, released_on) {
        this.title = title
        this.overview = overview
        this.average_votes = average_votes
        this.total_votes = total_votes
        this.image_url = image_url
        this.released_on = released_on
    }
}


let showMovie = async (req, res) => {
    const api_key = req.query.api_key;
    const query = req.query.query;

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`;
    let response = await axios.get(url);
    let movieData = response.data.results;
    let MovieObj = movieData.map(m =>
        new Movie(m.title, m.overview, m.vote_average, m.vote_count, m.poster_path, m.release_date)
    )
    res.status(200).json(MovieObj);
}

module.exports = { Movie, showMovie };
