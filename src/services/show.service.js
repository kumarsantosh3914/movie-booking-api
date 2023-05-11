const Show = require('../models/show.model');
const Theatre = require('../models/theatre.model');
const { STATUS } = require('../utils/constants');

/**
 * Creates a new show.
 * @param {Object} data - Details of the show to be created.
 * @returns {Object} - The new show details.
 */
const createShow = async (data) => {
    try {
        const theatre = await Theatre.findById(data.theatreId);
        if (!theatre) {
            throw {
                err: 'No theatre found',
                code: STATUS.NOT_FOUND
            };
        }
        if (!theatre.movies.includes(data.movieId)) {
            throw {
                err: 'Movie is currently not available in the requested theatre',
                code: STATUS.NOT_FOUND
            };
        }
        const response = await Show.create(data);
        return response;
    } catch (error) {
        if (error.name === 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
            throw {
                err,
                code: STATUS.UNPROCESSABLE_ENTITY
            };
        }
        throw error;
    }
};

/**
 * Retrieves shows based on the provided filter criteria.
 * @param {Object} data - Filter criteria for shows (theatreId, movieId).
 * @returns {Array} - Array of shows matching the filter criteria.
 */
const getShow = async (data) => {
    try {
        const filter = {};
        if (data.theatreId) {
            filter.theatreId = data.theatreId;
        }
        if (data.movieId) {
            filter.movieId = data.movieId;
        }
        const response = await Show.find(filter);
        if (!response || response.length === 0) {
            throw {
                err: 'No show found',
                code: STATUS.NOT_FOUND,
            };
        }
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Deletes a show by its ID.
 * @param {string} id - ID of the show to be deleted.
 * @returns {Object} - The deleted show.
 */
const deleteShow = async (id) => {
    try {
        const response = await Show.findByIdAndDelete(id);
        if (!response) {
            throw {
                err: 'No show found',
                code: STATUS.NOT_FOUND,
            };
        }
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Updates a show by its ID.
 * @param {string} id - ID of the show to be updated.
 * @param {Object} data - Updated data for the show.
 * @returns {Object} - The updated show.
 */
const updateShow = async (id, data) => {
    try {
        const response = await Show.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
        if (!response) {
            throw {
                err: 'No show found for the given id',
                code: STATUS.NOT_FOUND,
            };
        }
        return response;
    } catch (error) {
        if (error.name === 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
            throw {
                err,
                code: STATUS.UNPROCESSABLE_ENTITY
            };
        }
        throw error;
    }
};

module.exports = {
    createShow,
    getShow,
    deleteShow,
    updateShow,
};
