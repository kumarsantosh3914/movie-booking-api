const movieController = require('../controllers/movie.controller');
const movieMiddleware = require('../middlewares/movie.middlewares');
const authMiddleware = require('../middlewares/auth.middlewares');

const routes = (app) => {
    // routes function takes express app object as parameter

    // CREATE
    app.post(
        '/api/v1/movies',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        movieMiddleware.validateMovieCreateRequest,
        movieController.createMovie
    );

    // DELETE
    app.delete(
        '/api/v1/movies/:id',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        movieController.deleteMovie,
    )

    // READ
    app.get(
        '/api/v1/movies/:id',
        movieController.getMovie
    )

    // READ
    app.put(
        '/api/v1/movies/:id',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        movieController.updateMovie,
    )

    // UPDATE
    app.patch(
        '/api/v1/movies/:id',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        movieController.updateMovie
    )

    // UPDATE
    app.get(
        '/api/v1/movies/:id',
        movieController.getMovies
    )
}

module.exports = routes;