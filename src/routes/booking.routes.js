const bookingController = require('../controllers/booking.controller');

const routes = (app) => {
    app.post(
        '/api/v1/bookings',
        bookingController.create
    )
}

module.exports = routes;