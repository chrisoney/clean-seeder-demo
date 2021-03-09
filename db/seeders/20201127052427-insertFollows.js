'use strict';
// Importing data for my user
const { currentFollows } = require('../../current.js');
const { altFollows } = require('../../alt_approach')
// Importing User so that I can query with it
const { User } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Sample info needed for seeding
      {
        followerId: num,
        followingId: num,
      }
    */

    // Step 1
    // Initializing an empty array
    const values = [];

    // Option 1
    // Dynamic approach to creating starting follows
    let startingFollows = currentFollows;

    // Query for all of the Users and limit the attributes down to id and username
    const currentUsers = await User.findAll({
      attributes: ['id', 'username'],
    });
    // Initialize and empty object to hold the data I want to use to search
    const usersObj = {};
    // Cycle through the users that I queried for and add a username: id key-value pair for easy reference
    currentUsers.forEach((user) => {
      usersObj[`${user.username}`] = user.id;
    });

    // Looping through the follows to convert usernames into the primary keys, so that they can be used as foreign keys
    for (let i = 0; i < startingFollows.length; i++) {
      // Each follow from my own objects
      let prevFollow = startingFollows[i];

      // Finding the follower within the object I've built for users
      const followerId = userObj[prevFollow.follower];
      // Finding the User being followed within the object I've built for users
      const followingId = userObj[prevFollow.following];

      // Passing in a new object with the numbers of the primary keys, so that I can use them as foreign keys
      values.push({
        followerId,
        followingId,
      });
    }

    // Option 2
    // Alt approach to creating starting follows
    // values.push(...altFollows);

    // Step 2 function
    // Fake follows! There's a joke there!
    function makeFollows(start, stop, numFollows) {
      // result array I'll add to values array
      let result = [];
      // start is the id I start at, stop is the id I stop before
      for (let x = start; x < stop; x++) {
        let followerId = x;
        // This is to keep track of previous follows so that I don't have repeats
        let followers = [];

        // Loop is set to the number of follows I want each user to have
        for (let y = 0; y < numFollows; y++) {
          // Picking a random number between starting user and last user
          let followingId = Math.floor(Math.random() * (stop - start)) + start;
          // Looping through until we have a new value for followingId that we
          // haven't seen before for this followerId
          while (followers.includes(followingId) || x === followingId) {
            followingId = Math.floor(Math.random() * (stop - start)) + start;
          }
          // adding this new followingId to the array so we can check against it
          // later
          followers.push(followingId);
          // adding this new follow row to the results we have so far
          result.push({
            followerId: followerId,
            followingId: followingId,
          });
        }
      }
      // returning the result
      return result;
    }

    // Step 2 setup
    // Query for the number of users
    const numUsers = await User.count();
    // Decide how many follows each user should have
    const numFollows = 5;
    // Grabbing the first user which happens to be mine
    const myUser = await User.findOne({ where: { username: 'chris' } });
    const myId = myUser.id; // First user's id
    const startId = myId + 1; // Starting point is after that user
    // Stopping point is calculated with adding the number of users to the first id
    const stop = numUsers + myId;

    // Step 2 implemented
    // Calling my function with a starting point, the number of users I have,
    // and how many follows each user should have.
    let newFollows = makeFollows(startId, stop, numFollows);

    // Step 3
    // Combining the data I manually created with what I created via the function
    values.push(...newFollows);

    // Step 4
    // The last of the seeding
    return queryInterface.bulkInsert('Follows', values, {});
  },

  down: (queryInterface, Sequelize) => {
    // Down function will just drop the whole table
    return queryInterface.bulkDelete('Follows', null, {});
  }
};
