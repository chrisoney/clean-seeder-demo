'use strict';
const { currentFollows } = require('../../current.js');
const { User } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});

      {
        followerId: num,
        followingId: num,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    */

    // Bringing in follows I want to come standard
    let values = currentFollows;
    // Fake follows! There's a joke there!
    function makeFollows(start, stop, numFollows){
      let result = [];
      for (let x = start; x <= stop; x++){
        let followerId = x;
        // This is to keep track of previous follows so that I don't have repeats
        let followers = [];
        for (let y = 0; y < numFollows; y++){
          let followingId = Math.floor(Math.random() * stop) + 1;
          while(followers.includes(followingId) || x === followingId) {
            followingId = Math.floor(Math.random() * stop) + 1
          }
          followers.push(followingId);
          result.push({
            followerId: followerId,
            followingId: followingId,
          })
        }

      }
      return result;
    }
    // Query for the number of users
    let numUsers = await User.count();
    // Calling my function with a starting point, the number of users I have, and how many
    // follows each user should have
    let newFollows = makeFollows(2, numUsers, 5)
    values.push(...newFollows)
    // The last of the seeding
    return queryInterface.bulkInsert('Follows', values, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Follows', null, {});

  }
};
