'use strict';
// tempRecs is just for demo lecture purposes
const { tempRecs, currentRecs } = require('../../current.js');
const { addStoryIdToRecs } = require('../../alt_approach.js');
const reviews = require('../../reviews');
// importing these so we can query those tables for counts
const { User, Story } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 1
    // Initializing the array that I will pass into the bulk insert
    const values = [];

    // Option 1
    // Dynamic approach to adding starting recommendations
    // Start with the data I pulled in from the other file
    const startingRecs = currentRecs;

    // Query for the users and stories so that I don't have to do another query for each object I cycle through
    const currentUsers = await User.findAll({
      attributes: ['id', 'username'],
    });
    const usersObj = {};
    currentUsers.forEach((user) => {
      usersObj[`${user.username}`] = user.id;
    });
    const currentStories = await Story.findAll({
      attributes: ['id', 'username'],
    });
    const storiesObj = {};
    currentStories.forEach((story) => {
      storiesObj[`${story.title}`] = story.id;
    });

    // Looping through each object in that prebuilt array
    for (let x = 0; x < startingRecs.length; x++) {
      let rec = startingRecs[x];
      // Creating a new recommendation with the attributes that won't change
      const newRec = { rating: rec.rating, review: rec.review };
      // Querying for the user and using the id for my new rec
      // const user = await User.findOne({ where: { username: rec.user } });
      // newRec.userId = user.id;
      newRec.userId = usersObj[rec.user];
      // Querying for the story and using the id for my new rec
      // const story = await Story.findOne({ where: { title: rec.story } });
      // newRec.storyId = story.id;
      newRec.storyId = storiesObj[rec.story];
      // Adding this new rec to my existing values
      values.push(newRec);
    }

    // Option 2
    // Alt approach to adding starting recommendations
    // values.push(...addStoryIdToRecs());

    // Step 2
    // Making new recommendations with the number of reviews per user,
    // number of users I have, number of stories I have, fake reviews, and id to start at for both users and stories
    function makeRecommendations(
      numRecommendations,
      usersEnd,
      numStories,
      reviews,
      usersStart,
      storiesStart
    ) {
      // Initializing and empty array to hold them
      const result = [];
      // Looping through all the users except the first one to add reviews for them
      for (let k = usersStart; k < usersEnd; k++) {
        // Keeping track of which stories this user has reviewed
        let stories = [];
        for (let i = 0; i < numRecommendations; i++) {
          // Randomly picking a rating for the recommendation
          const rating = Math.floor(Math.random() * 5) + 1;

          // Building the review
          // Initializing an empty array to hold the different parts of the new review
          let review = [];
          // Iterating through the values of the object that is the value tied to the key of the rating that I just generated. Each of these values will be an array of possible review parts (in this case I only have two parts that I will combine)
          Object.values(reviews[rating]).forEach((value) => {
            // Saving the length of the array to a variable for easier readability
            const arrLength = value.length;
            // Choosing a random index in the current array
            const index = Math.floor(Math.random() * arrLength);
            // Adding the review part at the random index to the review I've built so far
            review.push(value[index]);
          });
          // Joining the different parts (2) of the review array on a space.
          review = review.join(' ');

          // Grabbing a random storyId from the ones that are available
          let storyId = Math.floor(Math.random() * numStories) + storiesStart;
          // Making sure this user hasn't reviewed this story yet
          while (stories.includes(storyId))
            storyId = Math.floor(Math.random() * numStories) + storiesStart;

          // Adding the id of the story so we can check against it later on when randomly grabbing a story id
          stories.push(storyId);

          // Adding this new review to the results I have collected
          result.push({
            // completely random rating
            rating,
            // Grabbing the review with the index we generated a few lines ago
            review,
            userId: k,
            storyId,
          });
        }
      }
      return result;
    }

    // Step 2 preparation
    // Querying to figure out how many users I've seeded already
    const numUsers = await User.count();
    // Querying to figure out how many stories I've seeded already
    const numStories = await Story.count();
    // Choosing how many reviews each user should have
    const numRecs = 20;
    // Finding the first user in my database and grabbing the id, then adding one because I don't want to add reviews to 'chris'
    let usersStart = await User.findOne();
    usersStart = usersStart.id + 1;
    // Finding the first story in my database and grabbing the id
    let storiesStart = await Story.findOne();
    storiesStart = storiesStart.id;

    // Step 2 implementation
    // Creating those new fake recommendations.
    // numRecs is the number of recommendations per user.
    // numUsers and numStories are self explanatory.
    // Reviews are pulled from the object that I created in reviews.js
    // usersStart is to determine the id I would start at
    // storiesStart is to determine the id I would start at
    let recArray = makeRecommendations(
      numRecs,
      // This is more of a me problem because I artificially inflated the starting point, so I have to correct for that when determining where to stop
      numUsers + usersStart - 1, // usersEnd
      numStories,
      reviews,
      usersStart,
      storiesStart
    );

    // Step 3
    // Combining what I wrote myself with what I used the function to create
    values.push(...recArray);

    // Step 4
    // The actual seeding
    return queryInterface.bulkInsert('Recommendations', values, {});
  },

  down: (queryInterface, Sequelize) => {
    // Down function will just drop the whole table
    return queryInterface.bulkDelete('Recommendations', null, {});
  }
};
