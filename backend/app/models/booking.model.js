module.exports = (sequelize, Sequelize) => {
  const Booking = sequelize.define("bookings", {
    clientName:{
      type: Sequelize.STRING
    },
    checkin:{
      type: Sequelize.DATE
    },
    checkout:{
      type: Sequelize.DATE
    },
    price: {
      type: Sequelize.FLOAT(6, 3)
    },
    notes:{
      type:Sequelize.STRING
    }
  });

  return Booking;
};