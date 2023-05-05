////handle addroom,remove room, edit room,
const db = require("../models");
const Room = db.room;
const Booking = db.booking;

//create and save new room
exports.addRoom = async (req, res) => {
  //room is undefined
  if (Object.keys(req.body).length === 0) {
    return res.send({ message: "Room not Defined" });
  }
  try {
    const room = await Room.create({
      number: req.body.number,
      type: req.body.type,
      price: req.body.price,
      extras: req.body.extras,
    });
    if (room) res.send({ message: "Room Created" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//Retrieve all rooms
exports.findAll = async (req, res) => {
  try {
    const rooms = await Room.findAll();

    if (rooms) {
      let result = [];
      //new array so it wont send dates
      rooms.forEach((room) => {
        result.push({
          id: room.id,
          number: room.number,
          type: room.type,
          price: room.price,
          extras: room.extras,
          available: room.available,
        });
      });
      res.send(result);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Find a single Room with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const room = await Room.findByPk(id);
    if (!room)
      return res.send({ message: `Could not find room with ID:${id}` });
    let result = {
      id: room.id,
      number: room.number,
      type: room.type,
      price: room.price,
      extras: room.extras,
      available: room.available,
    };
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update a Room by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const room = await Room.findByPk(id);
    if (!room)
      return res.send({
        message: `Room with id=${id} not found.`,
      });
    const result = await Room.update(req.body, {
      where: { id: id },
    });
    if (result)
      res.send({
        message: `Room with id=${id} was updated successfully.`,
      });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Delete a Room with the specified id
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    //Find Room
    const room = await Room.findByPk(id);
    if (!room) return res.send({ message: `Room with id=${id} not found.` });
    //Destroy room
    const result = await room.destroy();
    if (result)
      return res.send({
        message: `Room with id=${id} was deleted successfully.`,
      });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//Find all available rooms
exports.findAllAvailable = (req, res) => {
  const isAvailable = req.query.isAvailable;

  Room.findAll({ where: { available: isAvailable } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving rooms.",
      });
    });
};

//Find rooms by type
exports.findRoomsByType = async (req, res) => {
  try {
    const type = req.params.type;
    const rooms = await Room.findAll({ where: { type: type , available:true} });
    if (!rooms) return res.send({ message: `No ${type} rooms.` });
    let result = [];
    //new array so it wont send dates
    rooms.forEach((room) => {
      result.push({
        id: room.id,
        number: room.number,
        type: room.type,
        price: room.price,
        extras: room.extras,
        available: room.available,
      });
    });
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
