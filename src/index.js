const express = require('express');
const connect = require('./config/database');
const { PORT } = require('./config/serverConfig');
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const bookingRoutes = require('./routes/booking.routes');
const MovieRoutes = require('./routes/movie.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const showRoutes = require('./routes/show.routes');
const paymentRoutes = require('./routes/payment.routes');
const theatreRoutes = require('./routes/theatre.routes');

const app = express();


// configuring body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.set('debug', true);

MovieRoutes(app); // invoking movie routes
bookingRoutes(app); // invoking booking routes
theatreRoutes(app); // invoking theatre routes
authRoutes(app); // invoking auth routes
userRoutes(app); // invoking user routes
showRoutes(app); // invoking show routes
paymentRoutes(app); // invoking payment routes


app.get('/', (req, res) => {
    res.send('Home');
})

app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    await connect();
    console.log(`mongo db connected`);
})