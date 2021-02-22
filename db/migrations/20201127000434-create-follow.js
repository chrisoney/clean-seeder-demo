'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Follows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      followerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: 'actions_unique',
        references: {
          model: "Users",
          key: "id"
        }
      },
      followingId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: 'actions_unique',
        references: {
          model: "Users",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        // This is so that we can ignore it in the seeders
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        // This is so that we can ignore it in the seeders
        defaultValue: Sequelize.fn('now')
      }
    },
    {
      // This is to set up a composite unique constraint on two different columns
      uniqueKeys: {
        actions_unique: {
            fields: ['followerId', 'followingId']
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Follows');
  }
};