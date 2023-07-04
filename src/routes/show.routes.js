const showController = require('../controllers/show.controller');
const authMiddlewares = require('../middlewares/auth.middlewares');
const showMiddlewares = require('../middlewares/show.middlewares');

const routes = (app) => {
    app.post(
        '/api/v1/shows',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        showMiddlewares.validationCreateShowRequest,
        showController.create
    );

    app.get(
        '/api/v1/shows',
        showController.getShow,
    );

    app.delete(
        '/api/v1/shows/:id',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        showController.destroy
    );

    app.patch(
        '/api/v1/shows/:id',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        showMiddlewares.validateShowUpdateRequest,
        showController.update
    );
}

module.exports = routes;