module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    isDisabled: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    role:{
      type: Sequelize.STRING,
      allowNull: false,
    }
  });

  return User;
};