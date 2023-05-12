const { STATUS, USER_ROLE, BOOKING_STATUS } = require('../utils/constants');
const { errerResponseBody } = require('../utils/responsebody');
const ObjectId = require('mongoose').Types.ObjectId;

const theatreService = require('../services/theatre.service');
const userService = require('../services/user.service');

const validateBookingCreateRequest = async (req, res, next) => {
    // validate the theatre id presence
    if (!req.body.theatreId) {
        errerResponseBody.err = "No theatre id provided";
        return res.status(STATUS.BAD_REQUEST).json(errerResponseBody);
    }

    // validate correct theatre id format 
    if (!ObjectId.isValid(req.body.theatreId)) {
        errerResponseBody.err = "Invalid theatreId provided";
        res.status(STATUS.BAD_REQUEST).json(errerResponseBody);
    }

    // check if theatre exists in database
    const theatre = await theatreService.getTheatre(req.body.theatreId);
    if (!theatre) {
        errerResponseBody.err = "No theatre for the given id";
        return res.status(STATUS.NOT_FOUND).json(errerResponseBody);
    }

    // validate movie presence
    if (!req.body.movieId) {
        errerResponseBody.err = "No movie id present";
        return res.status(STATUS.BAD_REQUEST).json(errerResponseBody);
    }

    // validate correct movie if format 
    if (!ObjectId.isValid(req.body.movieId)) {
        errerResponseBody.err = "No movie id present";
        return res.status(STATUS.BAD_REQUEST).json(errerResponseBody);
    }

    // validate if movie is running in the theatre or not
    console.log(theatre.movies.indexOf(req.body.movieId), req.body.movieId);
    if (theatre.movies.indexOf(req.body.movieId) == -1) {
        errerResponseBody.err = "Given movie is not available in the requested theatre";
        return res.status(STATUS.BAD_REQUEST).json(errerResponseBody);
    }

    // validate presence of timings 
    if (!req.body.timing) {
        errerResponseBody.err = "No movie timing passed";
        return res.status(STATUS.BAD_REQUEST).json(errerResponseBody);
    }

    // validate no of seats presence
    if (!req.body.noOfSeats) {
        errerResponseBody.err = "No seat provided";
        return res.status(STATUS.BAD_REQUEST).json(errerResponseBody);
    }
    // request is correct
    next();
}

const canChangeStatus = async (req, res, next) => {
    const user = await userService.getUserById(req.body);
    if (user.userRole == USER_ROLE.customer && req.body.status && req.body.status != BOOKING_STATUS.cancelled) {
        errerResponseBody.err = "You are not allowed to change the booking status";
        return res.status(STATUS.UNAUTHORISED).json(errerResponseBody);
    }
    next();
}

module.exports = {
    validateBookingCreateRequest,
    canChangeStatus,
}