

'use strict';

require('dotenv');
const express = require('express');
const cors = require('cors');
const movie = require('./modules/movie.js');
const weather = require('./modules/weather.js');
const app = express();

app.get('/weather', weatherHandler);

async function weatherHandler(request, response) {
    const { lat, lon } = request.query;
    await weather(lat, lon)
        .then(summaries => response.send(summaries))
        .catch((error) => {
            console.error(error);
            response.status(200).send('Sorry. Something went wrong!')
        });
}

/////////////////////////////////////////////////////////////////////////////////

app.get('/movies', movieHandler);

function movieHandler(request, response) {
    const { query } = request.query;
    movie(query)
        .then(summaries => { console.log(summaries + "frome server"); response.send(summaries) })
        .catch((error) => {
            console.error(error);
            response.status(200).send('Sorry. Something went wrong!')
        });
}




app.listen(8000, () => console.log(`Server up on 8000`));
