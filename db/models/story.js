'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT,
    },
    link: {
      type:DataTypes.STRING
    }
  }, {});
  Story.associate = function(models) {
    const columnMappingOne = { // Story -> User, through Subscription
      through: 'Subscription',
      otherKey: 'userId',
      foreignKey: 'storyId',
      as: 'subscribingUsers'
    }
    const columnMappingTwo = { // Story -> User, through Recommendation
      through: 'Recommendation',
      otherKey: 'userId',
      foreignKey: 'storyId',
      as: 'recommendingUsers'
    }

    Story.belongsToMany(models.User, columnMappingOne);
    Story.belongsToMany(models.User, columnMappingTwo);
    Story.hasMany(models.Subscription, { foreignKey: 'storyId' })
    Story.hasMany(models.Recommendation, { foreignKey: 'storyId' })
  };
  return Story;
};