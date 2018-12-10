'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    resetPasswordToken: DataTypes.STRING,
   
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};