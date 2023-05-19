////handle addroom,remove room, edit room,
const db = require("../models");
const Room = db.room;
const Booking = db.booking;

//create and save new room
exports.addRoom = async (req, res) => {
  //room is undefined
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: "Room not Defined" });
  }
  try {
    //no image uploaded
    if (!req.body.imgURL)
      return res.status(404).send({ message: "No image uploaded for Room." });
      
    const imgURL = "http://localhost:6868/api/files/download/" + req.body.imgURL;

    const room = await Room.create({
      number: req.body.number,
      type: req.body.type,
      price: req.body.price,
      extras: req.body.extras,
      imgURL: imgURL
    });
    if (room) res.status(200).send({ message: "Room Created" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//Retrieve all rooms
exports.findAll = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    if (!rooms) return res.status(404).send({ message: "No rooms found." });

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
        imgURL: room.imgURL,
      });
    });
    res.status(200).send(result);
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
      return res
        .status(404)
        .send({ message: `Could not find room with ID:${id}` });
    let result = {
      id: room.id,
      number: room.number,
      type: room.type,
      price: room.price,
      extras: room.extras,
      available: room.available,
      imgURL: room.imgURL,
    };
    res.status(200).send(result);
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
      return res.status(404).send({
        message: `Room with id=${id} not found.`,
      });
    const result = await Room.update(req.body, {
      where: { id: id },
    });
    if (result)
      res.status(200).send({
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
    if (!room)
      return res.status(404).send({ message: `Room with id=${id} not found.` });
    //Destroy room
    const result = await room.destroy();
    if (result)
      return res.status(200).send({
        message: `Room with id=${id} was deleted successfully.`,
      });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//Find all available rooms
exports.findAllAvailable = async (req, res) => {
  try {
    const isAvailable = req.query.isAvailable;
    const rooms = Room.findAll({ where: { available: isAvailable } });
    if (!rooms)
      return res
        .status(404)
        .send({ message: "Rooms not found or none available" });
    res.status(200).send(rooms);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//Find rooms by type
exports.findRoomsByType = async (req, res) => {
  try {
    const type = req.params.type;
    const rooms = await Room.findAll({
      where: { type: type, available: true },
    });
    if (!rooms) return res.status(404).send({ message: `No ${type} rooms.` });
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
        imgURL:room.imgURL
      });
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
