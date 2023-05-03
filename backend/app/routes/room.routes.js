//GET rooms api calls

const controller = require("../controllers/room.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/api/rooms/addroom",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addRoom
  );

  app.get(
    "/api/rooms/getRooms",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.findAll
  );

  app.get(
    "/api/rooms/getRoom/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findOne
  );

  app.get(
    "/api/rooms/getRoomsByType/:type",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findRoomsByType
  )
  app.put(
    "/api/rooms/updateRoom/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
  );

  app.delete(
    "/api/rooms/deleteRoom/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );


};
