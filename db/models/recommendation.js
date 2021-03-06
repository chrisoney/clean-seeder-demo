'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recommendation = sequelize.define(
    'Recommendation',
    {
      rating: {
        type: DataTypes.INTEGER,
      },
      review: {
        type: DataTypes.TEXT,
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
  Recommendation.associate = function(models) {
    Recommendation.belongsTo(models.Story, { foreignKey: 'storyId'})
    Recommendation.belongsTo(models.User, { foreignKey: 'userId'})
  };
  return Recommendation;
};