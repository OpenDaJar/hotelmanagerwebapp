const controller = require("../controllers/booking.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  //create Booking
  app.post(
    "/api/bookings/addBooking",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.createBooking
  );
  //get booking with id
  app.get(
    "/api/bookings/findBooking/:id",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.findBooking
  )

  //get Bookings for Room
  app.get(
    "/api/bookings/findBookings/:id",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.findBookings
  )

  //get All Bookings
  app.get(
    "/api/bookings/findAllBookings",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAllBookings
  )

  //Update Booking
  app.put(
    "/api/bookings/updateBooking/:id",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateBooking
  )

  //delete Booking
  app.delete(
    "/api/bookings/deleteBooking/:id",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteBooking
  )
};
