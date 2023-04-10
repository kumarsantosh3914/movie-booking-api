const mongoose = require('mongoose');
// Define the schema of the movie resource to be stored in database

const movieSchema = new mongoose.Schema({
    name: {
        Type: String,
        required: true,
        minLength: 2,
    },
    description: {
        type: String,
        required: true,
        minLength: 5,
    },
    casts: {
        type: [String],
        required: true,
    },
    trailerUrl: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
        default: "English",
    },
    releaseDate: {
        Type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    releaseStatus: {
        type: String,
        required: true,
        default: "RELEASED",
    },
}, { timestamps: true });

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;