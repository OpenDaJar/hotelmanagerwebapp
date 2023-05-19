module.exports = (sequelize, Sequelize) => {
  const Booking = sequelize.define("bookings", {
    clientName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    checkin: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    checkout: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    price: {
      type: Sequelize.FLOAT(12, 2).UNSIGNED,
      allowNull: false,
    },
    notes: {
      type: Sequelize.STRING,
    },
  });

  return Booking;
};
