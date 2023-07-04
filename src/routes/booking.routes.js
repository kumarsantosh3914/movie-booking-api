const bookingController = require('../controllers/booking.controller');

const authMiddleware = require('../middlewares/auth.middlewares');
const bookingMiddleware = require('../middlewares/booking.middlewares');

const routes = (app) => {
    app.post(
        '/api/v1/bookings',
        authMiddleware.isAuthenticated,
        bookingMiddleware.validateBookingCreateRequest,
        bookingController.create
    );

    app.patch(
        '/api/v1/bookings/:id',
        authMiddleware.isAuthenticated,
        bookingMiddleware.canChangeStatus,
        bookingController.update
    );

    app.get(
        '/api/v1/bookings',
        authMiddleware.isAuthenticated,
        bookingController.getBookings
    );

    app.get(
        '/api/v1/bookings/all',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdmin,
        bookingController.getAllBookings,
    );

    app.get(
        '/api/v1/bookings/:id',
        authMiddleware.isAuthenticated,
        bookingController.getBookingById,
    );
}

module.exports = routes;