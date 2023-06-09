const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middlewares');
const authMiddleware = require('../middlewares/auth.middlewares');

const routes = (app) => {
    app.patch(
        '/api/v1/user/:id',
        authMiddleware.isAuthenticated,
        userMiddleware.validateUpdateUserRequest,
        authMiddleware.isAdmin,
        userController.update,
    )
}

module.exports = routes;