'use strict';
// Importing data for my user
const { currentFollows } = require('../../current.js');
const { altFollows } = require('../../alt_approach')
// Importing User so that I can query with it
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
    let values = [];
    let startingFollows = currentFollows;
    for (let i = 0; i < currentFollows.length; i++){
      let prevFollow = currentFollows[i];
      const follower = await User.findOne({ 
        where: { username: prevFollow.follower }
      });
      const following = await User.findOne({ 
        where: { username: prevFollow.following }
      });
      values.push({
        followerId: follower.id,
        followingId: following.id
      })
    }

    // Fake follows! There's a joke there!
    function makeFollows(start, stop, numFollows){
      // result array I'll add to values array
      let result = [];
      // start is the id I start at, stop is the id I stop at
      for (let x = start; x < stop; x++){
        let followerId = x;
        // This is to keep track of previous follows so that I don't have repeats
        let followers = [];
        // Loop is set to the number of follows I want each user to have
        for (let y = 0; y < numFollows; y++){
          // Picking a random number between starting user and last user
          let followingId = Math.floor(Math.random() * (stop - start)) + start;
          // Looping through until we have a new value for followingId that we
          // haven't seen before for this followerId
          while(followers.includes(followingId) || x === followingId) {
            followingId = Math.floor(Math.random() * (stop - start)) + start
          }
          // adding this new followingId to the array so we can check against it
          // later
          followers.push(followingId);
          // adding this new follow row to the results we have so far
          result.push({
            followerId: followerId,
            followingId: followingId,
          })
        }

      }
      // returning the result
      return result;
    }
    // Query for the number of users
    const numUsers = await User.count();
    const numFollows = 5;
    const myUser = await User.findOne({ where: { username: "chris" } })
    const myId = myUser.id;
    const startId = myId + 1;
    const stop = numUsers + startId - 1;
    // Calling my function with a starting point, the number of users I have, 
    // and how many follows each user should have. You can also query for the 
    // first id in the table and have the starting point be that number if you
    // want to make follows for all your users
    let newFollows = makeFollows(startId, stop, numFollows);
    // Combining the data I manually created with what I created via the function
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
