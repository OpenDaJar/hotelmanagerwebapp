const controller = require("../controllers/booking.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/api/bookings/addBooking",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.createBooking
  );
};
