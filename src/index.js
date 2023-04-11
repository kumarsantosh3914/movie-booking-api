const express = require('express');
const connect = require('./config/database');
const { PORT } = require('./config/serverConfig');
const env = require('dotenv');
const bodyParser = require('body-parser');


const bookingRoutes = require('./routes/booking.routes');
const MovieRoutes = require('./routes/movie.routes');

const app = express();


// configuring body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

MovieRoutes(app); // invoking movie routes
bookingRoutes(app); // invoking booking routes

app.get('/', (req, res) => {
    res.send('Home');
})

app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    await connect();
    console.log(`mongo db connected`);
})