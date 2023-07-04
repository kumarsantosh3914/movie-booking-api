const theatreController = require("../controllers/theatre.controller");
const theatreMiddleware = require("../middlewares/theatre.middlewares");
const authMiddleware = require("../middlewares/auth.middlewares");

const routes = (app) => {
  // CREATE
  app.post(
    "/api/v1/theatres",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    theatreMiddleware.validateTheatreCreateRequest,
    theatreController.create
  );

  // DELETE
  app.delete(
    "/api/v1/theatres/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    theatreController.destroy
  );

  // READ
  app.get("/api/v1/theatres/:id", theatreController.getTheatre);

  // READ
  app.get("/api/v1/theatres", theatreController.getTheatres);

  // UPDATE
  app.patch(
    "/api/v1/theatres/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    theatreController.update
  );

  // UPDATE
  app.put(
    "/api/v1/theatres/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    theatreController.update
  );

  app.patch(
    "/api/v1/theatres/:id/movies",
    theatreMiddleware.validateUpdateMovieRequest,
    theatreController.updateMovies
  );

  app.get("/api/v1/theatres/:id/movies", theatreController.getMovies);

  app.get(
    "/api/v1/theatres/:theatreId/movies/:movieId",
    theatreController.checkMovie
  );
};

module.exports = routes;
