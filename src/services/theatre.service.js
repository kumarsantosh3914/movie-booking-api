const Theatre = require('../models/theatre.model');
const Movie = require('../models/movie.model');
const { STATUS } = require('../utils/constants');

/**
 * Create a new theatre.
 * @param data - Object containing details of the theatre to be created.
 * @returns - Object with the new theatre details.
 */
const createTheatre = async (data) => {
    try {
        const response = await Theatre.create(data);
        return response;
    } catch (error) {
        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            throw { err: err, code: STATUS.UNPROCESSABLE_ENTITY };
        }
        console.log(error);
        throw err;
    }
}

/**
 * Delete a theatre by its unique ID.
 * @param id - The unique ID of the theatre to be deleted.
 * @returns - The deleted theatre object.
 */
const deleteTheatre = async (id) => {
    try {
        const response = await Theatre.findByIdAndDelete(id);
        if (!response) {
            throw {
                err: "No record of a theatre found for the given id",
                code: STATUS.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Get a theatre by its unique ID.
 * @param id - The unique ID of the theatre to be fetched.
 * @returns - The theatre object.
 */
const getTheatre = async (id) => {
    try {
        const response = await Theatre.findById(id);
        if (!response) {
            // no record found for the given id
            throw {
                err: "No theatre found for the given id",
                code: STATUS.NOT_FOUND,
            }
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Get all theatres based on provided filters.
 * @param data - Data object used to filter theatres based on city, pincode, name, movieId, limit, and skip.
 * @returns - Array of theatres matching the filters.
 */
const getAllTheatres = async (data) => {
    try {
        let query = {};
        let pagination = {};
        if (data && data.city) {
            // Check if city is present in query params
            query.city = data.city
        }
        if (data && data.pincode) {
            // Check if pincode is present in query params
            query.pincode = data.pincode;
        }
        if (data && data.name) {
            // Check if name is present in query params
            query.name = data.name;
        }
        if (data && data.movieId) {
            query.movies = { $all: data.movieId };
        }
        if (data && data.limit) {
            pagination.limit = data.limit;
        }
        if (data && data.skip) {
            // For first page, set skip as 0
            let perPage = (data.limit) ? data.limit : 3;
            pagination.skip = data.skip * perPage;
        }
        const response = await Theatre.find(query, {}, pagination);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Update a theatre by its unique ID.
 * @param id - The unique ID of the theatre to be updated.
 * @param data - Data object used to update the theatre.
 * @returns - The updated theatre object.
 */
const updateTheatre = async (id, data) => {
    try {
        const response = await Theatre.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
        if (!response) {
            // No record found for the given id
            throw {
                err: "No theatre found for the given id",
                code: STATUS.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            throw { err: err, code: STATUS.UNPROCESSABLE_ENTITY };
        }
        throw error;
    }
}

/**
 * Update movies in a theatre by theatre ID.
 * @param theatreId - Unique ID of the theatre for which movies should be updated.
 * @param movieIds - Array of movie IDs to be inserted or removed.
 * @param insert - Boolean value indicating whether to insert or remove movies.
 * @returns - Updated theatre object.
 */
const updateMoviesInTheatre = async (theatreId, movieIds, insert) => {
    try {
        let theatre;
        if (insert) {
            // Insert movies
            theatre = await Theatre.findByIdAndUpdate(
                { _id: theatreId },
                { $addToSet: { movies: { $each: movieIds } } },
                { new: true }
            );
        } else {
            // Remove movies
            theatre = await Theatre.findByIdAndUpdate(
                { _id: theatreId },
                { $pull: { movies: { $in: movieIds } } },
                { new: true }
            );
        }
        return theatre.populate('movies');
    } catch (error) {
        if (error.name == 'TypeError') {
            throw {
                code: STATUS.NOT_FOUND,
                err: 'No theatre found for the given id'
            }
        }
        console.log("Error is", error);
        throw error;
    }
}

/**
 * Get movies in a theatre by theatre ID.
 * @param id - Unique ID of the theatre.
 * @returns - Theatre object with populated movies.
 */
const getMoviesInTheatre = async (id) => {
    try {
        const theatre = await Theatre.findById(id, { name: 1, movies: 1, address: 1 }).populate('movies');
        if (!theatre) {
            throw {
                err: 'No theatre with the given id found',
                code: STATUS.NOT_FOUND
            }
        }
        return theatre;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Check if a movie is present in a theatre.
 * @param theatreId - Unique ID of the theatre.
 * @param movieId - ID of the movie to check.
 * @returns - Boolean value indicating whether the movie is present in the theatre or not.
 */
const checkMovieInATheatre = async (theatreId, movieId) => {
    try {
        let response = await Theatre.findById(theatreId);
        if (!response) {
            throw {
                err: "No such theatre found for the given id",
                code: STATUS.NOT_FOUND
            }
        }
        return response.movies.indexOf(movieId) != -1;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatres,
    updateTheatre,
    updateMoviesInTheatre,
    getMoviesInTheatre,
    checkMovieInATheatre,
};


