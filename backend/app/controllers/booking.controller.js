//handle bookings

const db = require("../models");
const Room = db.room;
const Booking = db.booking;

//create Booking
exports.createBooking = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.send({ message: "Booking not Defined" });
    return;
  }
  //search if room exists
  Room.findByPk(req.body.roomId)
    .then((room) => {
      if (room) {
        //create booking
        Booking.create({
          clientName: req.body.clientName,
          checkin: req.body.checkin,
          checkout: req.body.checkout,
          price: req.body.price,
          notes: req.body.notes,
        }).then((booking) => {
          //add assosiation room/booking
          booking
            .setRooms(room)
            .then(() => res.send({ message: "Booking added successfully!" }));
        });
      } else {
        res.send({ message: "No Room with this ID" });
        return;
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while adding Booking.",
      });
    });

  // if (req.body.roomId) {

  //   const room = await Room.findByPk(req.body.roomId)
  //   if(!room){
  //     res.send({message:"No room with this id"})
  //     return;
  //   }
  //   const booking = await Booking.create({
  //     clientName: req.body.clientName,
  //     checkin: req.body.checkin,
  //     checkout: req.body.checkout,
  //     price: req.body.price,
  //     notes: req.body.notes,
  //   });
  //   const result = booking.setRooms(room)
  //   if (result) res.send({ message: "Booking added successfully!" });
  // }else{
  //   res.send({message:"No room id sent"})
  // }
};

//delete booking
exports.deleteBooking = (req, res) => {};

//find one booking
exports.findBooking = (req, res) => {};

//find bookings for one room
exports.findBookings = (req, res) => {};

//find all bookings
exports.findAllBookings = (req, res) => {};

//update bookings
exports.updateBooking = (req, res) => {};
