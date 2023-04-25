////handle addroom,remove room, edit room,
const db = require("../models");
const Room = db.room;

//create and save new room
exports.addRoom = (req, res) => {
  //if room fields are undefined
  if(Object.keys(req.body).length === 0){
    res.send({message: "Room not Defined"});
    return;
  }
  
  //Create a Room
  const room = {
    number: req.body.number,
    type: req.body.type,
    price: req.body.price,
    extras: req.body.extras,
  };

  Room.create(room)
    .then(() => {
      res.send({ message: "Room Added!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating new Room.",
      });
    });
};

//Retrieve all rooms
exports.findAll = (req, res) => {
  
  Room.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all Rooms."
      });
    });
};

// Find a single Room with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Room.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Room with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Room with id=" + id
      });
    });
};

// Update a Room by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Room.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Room with id=${id} was updated successfully.`
        });
      } else {
        res.send({
          message: `Cannot update Room with id=${id}. Maybe Room was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Room with id=" + id
      });
    });
};

// Delete a Room with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Room.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Room with id=${id} was deleted successfully!`
        });
      } else {
        res.send({
          message: `Cannot delete Room with id=${id}. Maybe Room was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Room with id=" + id
      });
    });
};

//Find all available rooms
exports.findAllAvailable = (req, res) => {
  const isAvailable = req.query.isAvailable;

  Room.findAll({ where: {available: isAvailable} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving rooms."
      });
    });
};
