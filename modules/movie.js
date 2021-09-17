'use strict';
let MOVIE_API_KEY = process.env.MOVIE_API_KEY
let cache = require('./cache.js');
const axios = require('axios');
let movieSummaries = [];
getMovie('amman')
module.exports = getMovie;
function getMovie(query) {
    const key = 'movie-' + query;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${query}`;

    if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
        console.log('Cache movie hit');
    } else {
        console.log('Cache movie miss');
        cache[key] = {};
        cache[key].timestamp = Date.now();
        cache[key].data = axios.get(url)
            .then(response => parseMovie(response.data));
    }
    return cache[key].data;
}
function parseMovie(movieData) {
    try {
        movieSummaries = movieData.results.map(movie1 => {
            return new Movie(movie1);
        });

        return Promise.resolve(movieSummaries);
    } catch (e) {
        return Promise.reject(e);
    }

}

class Movie {
    constructor(movie1) {
        this.title = movie1.title
        this.overview = movie1.overview
        this.vote_average = movie1.vote_average
        this.vote_count = movie1.vote_count
        this.release_date = movie1.release_date
        this.backdrop_path = movie1.backdrop_path
    }
}
