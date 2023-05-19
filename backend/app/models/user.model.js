module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isDisabled: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return User;
};
