//handle bookings

const db = require("../models");
const Room = db.room;
const Booking = db.booking;

exports.createBooking = async (req, res) => {
  try {
    const room = await Room.findByPk(req.body.roomId);
    if (!room)
      return res.send({
        message: `Room with ID: ${req.body.roomId} does not exist`,
      });

      const booking = await Booking.create({
        clientName: req.body.clientName,
        checkin: req.body.checkin,
        checkout: req.body.checkout,
        price: req.body.price,
        notes: req.body.notes,
        roomId:room.id
      });

      if (booking)
      return res.send({
        message: "Booking Created",
      });

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//create Booking
exports.createBookingTest = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.send({ message: "Booking not Defined" });
  }

  try {
    //find room
    const room = await Room.findByPk(req.body.roomId);
    if (!room)
      return res.send({
        message: `Room with ID: ${req.body.roomId} does not exist`,
      });

    //create booking
    const booking = await Booking.create({
      clientName: req.body.clientName,
      checkin: req.body.checkin,
      checkout: req.body.checkout,
      price: req.body.price,
      notes: req.body.notes,
    });
    //setting association between room/booking
    const result = await booking.setRooms(room);

    if (result) res.send({ message: "Booking added successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//delete booking
exports.deleteBooking = (req, res) => {};

//find one booking
exports.findBooking = (req, res) => {};

//find bookings for one room
exports.findBookings = async (req, res) => {
  try {
    const id = req.params.id;
    const room = await Room.findByPk(id);
    if (!room)
      return res.send({ message: `Room with ID ${id} does not exist` });
    //get bookings for Room
    const bookings = await room.getBookings();

    if (Object.keys(bookings).length === 0)
      return res.send({
        message: `Room with ID ${id} does not have any bookings`,
      });
    else {
      //return bookings for Room
      let result = [];
      bookings.forEach((booking) => {
        result.push({
          id: booking.id,
          clientName: booking.clientName,
          checkin: booking.checkin,
          checkout: booking.checkout,
          price: booking.price,
          notes: booking.notes,
        });
      });
      return res.send(result);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//find all bookings
exports.findAllBookings = async (req, res) => {
  try {
    const rooms = await Room.findAll({});
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//update bookings
exports.updateBooking = (req, res) => {};
