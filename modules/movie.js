'use strict';
let MOVIE_API_KEY = "74b29308bb70138feec3e94fe656d2a2"
let cache = require('./cache.js');
const axios = require('axios');
module.exports = getMovie;
getMovie('amman')
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
let movieSummaries = {};
function parseMovie(movieData) {

    try {
        movieSummaries = movieData.results.map(movie1 => {
            console.log(movie1)
            return new Movie(movie1);
        });
        module.exports = { movieSummaries }

        return Promise.resolve(movieSummaries);
    } catch (e) {
        return Promise.reject(e);
    }

}

class Movie {
    constructor(movie1) {
        // this.original_title = movie1.original_title;
        // this.overview = movie1.overview;
        this.data = this.popularity
    }
}
console.log(movieSummaries + " from movie")
