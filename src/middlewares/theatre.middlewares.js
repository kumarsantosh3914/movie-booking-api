const { errorResponseBody } = require('../utils/responsebody');

/**
 * Validates the request for creating a theatre
 * @param req - HTTP request object
 * @param res - HTTP response object
 * @param next - Next middleware function
 * @returns {boolean} - Whether the request is valid or not
 */
const validateTheatreCreateRequest = async (req, res, next) => {
    // Validate the presence of name
    if (!req.body.name) {
        errorResponseBody.err = "The name of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody);
    }

    // Validate the presence of pincode
    if (!req.body.pincode) {
        errorResponseBody.err = "The pincode of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody);
    }

    // Validate the presence of city
    if (!req.body.city) {
        errorResponseBody.err = "The city of the theatre is not present";
        return res.status(400).json(errorResponseBody);
    }

    // Everything is fine, move to the next middleware
    next();
};

/**
 * Validates the request for updating movies in a theatre
 * @param req - HTTP request object
 * @param res - HTTP response object
 * @param next - Next middleware function
 * @returns {boolean} - Whether the request is valid or not
 */
const validateUpdateMovieRequest = async (req, res, next) => {
    // Validate the insert parameter
    if (req.body.insert === undefined) {
        errorResponseBody.err = "The insert parameter is missing in the request";
        return res.status(400).json(errorResponseBody);
    }

    // Validate the presence of movieIds
    if (!req.body.movieIds) {
        errorResponseBody.err = "No movie present in the request to be updated in the theatre";
        return res.status(400).json(errorResponseBody);
    }

    // Validate if movieIds is an array or not
    if (!(req.body.movieIds instanceof Array)) {
        errorResponseBody.err = "Expected an array of movies but found something else";
        return res.status(400).json(errorResponseBody);
    }

    // Validate if movieIds is empty or not
    if (req.body.movieIds.length === 0) {
        errorResponseBody.err = "No movies present in the array provided";
        return res.status(400).json(errorResponseBody);
    }

    // Everything is fine, move to the next middleware
    next();
};

module.exports = {
    validateTheatreCreateRequest,
    validateUpdateMovieRequest,
};
