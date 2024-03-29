const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

const routes = (app) => {
  app.post(
    "/api/v1/auth/signup",
    authMiddleware.validateSignupRequest,
    authController.signup
  );

  app.post(
    "/api/v1/auth/signin",
    authMiddleware.validateSigninRequest,
    authController.signin
  );

  app.patch(
    "/api/v1/auth/reset",
    authMiddleware.isAuthenticated,
    authMiddleware.validateResetPasswordRequest,
    authController.resetPassword
  );
  app.post(
    "/api/v1/auth/signup",
    authMiddleware.validateSignupRequest,
    authController.signup
  );

  app.post(
    "/api/v1/auth/signin",
    authMiddleware.validateSigninRequest,
    authController.signin
  );

  app.patch(
    "/api/v1/auth/reset",
    authMiddleware.isAuthenticated,
    authMiddleware.validateResetPasswordRequest,
    authController.resetPassword
  );
};

module.exports = routes;
