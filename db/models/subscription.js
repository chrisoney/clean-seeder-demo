'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define(
    'Subscription',
    {
      book: {
        type: DataTypes.STRING,
        defaultValue: '0',
      },
      chapter: {
        type: DataTypes.STRING,
        defaultValue: '0',
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      storyId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['userId', 'storyId'],
        },
      ],
    }
  );
  Subscription.associate = function(models) {
    Subscription.belongsTo(models.Story, { foreignKey: 'storyId', as: 'subscriptionStory'})
    Subscription.belongsTo(models.User, { foreignKey: 'userId'})
  };
  return Subscription;
};