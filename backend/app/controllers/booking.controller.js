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
      roomId: room.id,
    });

    if (booking)
      res.send({
        message: "Booking Created",
      });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//delete booking
exports.deleteBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Booking.findByPk(id);
    if (!booking)
      return res.send({
        message: `No booking with ID:${id} found for deletion`,
      });
    const result = await booking.destroy();
    if (result)
      res.send({
        message: `Booking with ID:${id} deleted successfully!`,
      });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//find one booking
exports.findBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Booking.findByPk(id);
    console.log(booking);
    if (!booking)
      return res.send({ message: `Booking with ID ${id} does not exist` });
    res.send(booking);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//find bookings for one room
exports.findBookings = async (req, res) => {
  try {
    const id = req.params.id;
    const room = await Room.findByPk(id);
    if (!room)
      return res.send({ message: `Room with ID ${id} does not exist` });
    //get bookings for Room
    const bookings = await room.getBookings();
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
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//find all bookings
exports.findAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    if (bookings) return res.send(bookings);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//update bookings
exports.updateBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const booking = await Booking.update(req.body, {
      where: { id: id },
    });
    if (!booking)
      return res.send({ message: `Booking with ID:${id} cannot update` });
    res.send("Room updated successfully!");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
