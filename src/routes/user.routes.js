const userController = require('../controllers/user.controller');

const route = (app) => {
    app.patch(
        '/api/v1/user/:id',
        userController.update,
    )
}