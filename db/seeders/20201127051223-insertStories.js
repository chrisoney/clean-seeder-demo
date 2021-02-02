'use strict';
const { tempStories, currentStories, currentFollows, currentRecs } = require('../../current.js');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});

      {
        title: '',
        description: ``,
        link: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    */

    // I wrote all this data myself so there's no need to set up fake data here
    return queryInterface.bulkInsert('Stories', currentStories, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Stories', null, {});
  }
};
