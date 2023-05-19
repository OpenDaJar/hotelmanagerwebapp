module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define("rooms", {
    number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.FLOAT(10, 2).UNSIGNED,
      allowNull: false,
    },
    extras: {
      type: Sequelize.STRING,
    },
    available: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    imgURL: {
      type: Sequelize.STRING,
    },
  });

  return Room;
};
