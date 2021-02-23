'use strict';
// These imports are mostly for the purposes of the demo. All I usually care
// about is the currentStories array
const { 
  tempStories, 
  currentStories, 
} = require('../../current.js');

module.exports = {
  up: (queryInterface, Sequelize) => {

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
