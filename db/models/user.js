'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY,
    }
  }, {});
  User.associate = function(models) {
    const columnMappingOne = { // User -> Story, through Subscription
      through: 'Subscription',
      otherKey: 'storyId',
      foreignKey: 'userId',
      as: 'subscribedStories'
    }
    const columnMappingTwo = { // User -> Story, through Recommendation
      through: 'Recommendation',
      otherKey: 'storyId',
      foreignKey: 'userId',
      as: 'recommendedStories'
    }
    const columnMappingThree = { // User -> User, through Follow as follower
      through: 'Follow',
      otherKey: 'followingId',
      foreignKey: 'followerId',
      as: 'followings'
    }
    const columnMappingFour = { // User -> User, through Follow as following
      through: 'Follow',
      otherKey: 'followerId',
      foreignKey: 'followingId',
      as: 'followers'
    }
    
    User.belongsToMany(models.Story, columnMappingOne);
    User.belongsToMany(models.Story, columnMappingTwo);
    User.belongsToMany(models.User, columnMappingThree);
    User.belongsToMany(models.User, columnMappingFour);
    User.hasMany(models.Recommendation, { foreignKey: 'userId', as: 'recommendations'})
    User.hasMany(models.Subscription, { foreignKey: 'userId', as: 'subscriptions'})
  };
  return User;
};