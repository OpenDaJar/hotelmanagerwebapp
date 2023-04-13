module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define("rooms", {
    number: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.FLOAT(6, 3)
    },
    extras: {
      type: Sequelize.STRING
    },
    available:{
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });

  return Room;
};