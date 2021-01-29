'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    followerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    followingId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Follow.associate = function(models) {
    // associations can be defined here
  };
  return Follow;
};