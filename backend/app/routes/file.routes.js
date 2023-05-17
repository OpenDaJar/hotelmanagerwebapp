const controller = require("../controllers/file.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/api/files/upload",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.upload
  );

  app.get(
    "/api/files/getListFiles",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.getListFiles
  );

  app.get(
    "/api/files/download/:name",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.download
  );

  app.delete(
    "/api/files/delete/:name",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.remove
  );

}