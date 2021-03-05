'use strict';
// tempRecs is just for demo lecture purposes
const { tempRecs, currentRecs } = require('../../current.js');
const { addStoryIdToRecs } = require('../../alt_approach.js');
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
    // Looping through each object in that prebuilt array
    for (let x = 0; x < startingRecs.length; x++) {
      let rec = startingRecs[x];
      // Creating a new recommendation with the attributes that won't change
      const newRec = { rating: rec.rating, review: rec.review };
      // Querying for the user and using the id for my new rec
      const user = await User.findOne({ where: { username: rec.user } });
      newRec.userId = user.id;
      // Querying for the story and using the id for my new rec
      const story = await Story.findOne({ where: { title: rec.story } });
      newRec.storyId = story.id;
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
      numReviews,
      userEnd,
      numStories,
      reviews,
      userStart,
      storyStart
    ) {
      // Initializing and empty array to hold them
      const result = [];
      // Looping through all the users except the first one to add reviews for them
      for (let k = userStart; k < userEnd; k++) {
        // Keeping track of which stories this user has reviewed
        let stories = [];
        for (let i = 0; i < numReviews; i++) {
          // Grabbing a random review index
          let index = Math.floor(Math.random() * reviews.length);
          // Grabbing a random storyId from the ones that are available
          let storyId = Math.floor(Math.random() * numStories) + storyStart;
          // Making sure this user hasn't reviewed this story yet
          while (stories.includes(storyId))
            storyId = Math.floor(Math.random() * numStories) + storyStart;

          // Adding the id of the story so we can check against it later on when randomly grabbing a story id
          stories.push(storyId);

          // Adding this new review to the results I have collected
          result.push({
            // completely random rating
            rating: Math.floor(Math.random() * 5) + 1,
            // Grabbing the review with the index we generated a few lines ago
            review: reviews[index],
            userId: k,
            storyId,
          });
        }
      }
      return result;
    }

    // Step 2 preparation
    // Fake reviews
    const reviews = [
      'Great!',
      'Sweet!',
      '',
      '',
      '',
      'Love it!',
      'Meh',
      `From some of my brief discussions with the author, it seemed there were no plans at all to bring this story to the Royalroad platform. Many tried to persuade him with little success. But it seems that Royalroad is going to be graced with this story after all. I have followed this story since sometime back in 2013, and this might be my favourite high-fantasy fiction of all time. `,
      `One thing I especially love is that the story has a well developed system of rules, and the author actually abides by the rules well enough that I have not spotted any area of cheating. I won't claim to have perfect analysis abilities, but there are exceedingly few stories I can say this about. Usually authors create very loose rules so that this does not become an issue, or they simply break the rules for the sake of plot. Not so in this story. Everything makes sense. This is some of the highest praise I can give to a fantasy story. So many stories that I enjoy suffer from the lack of immersion created by simply not making sense. This story makes sense.`,
      `Now for my personal reasons for the scores. I find this webnovel amazing, the time loop is executed so well. The MC moves between tasks in a pace that refresh the plot instead of falling into the predicted looping as one might think.`,
      `I've been following this story for years on fictionpress, so I'm super happy it was finally ported over here. This story is one of the best I've ever encountered online.`,
      `The characters grow along with the story and the magic system is used in a way befitting a fantasy story, vague at times but detailed to further the story. Not every story must explain in detail how their magic system works.`,
      `I highly recommend this story to everybody. Even if you don't think you'll like it from what you hear. Not only does this story dodge every single pitfall that comes its way, it absolutely obliterates them.`,
      `This is absolutely terrible`,
    ];
    // Querying to figure out how many users I've seeded already
    const numUsers = await User.count();
    // Querying to figure out how many stories I've seeded already
    const numStories = await Story.count();
    // Choosing how many reviews each user should have
    const numRecs = 5;
    // Finding the first user in my database and grabbing the id, then adding one because I don't want to add reviews to 'chris'
    let userStart = await User.findOne();
    userStart = userStart.id + 1;
    // Finding the first story in my database and grabbing the id
    let storyStart = await Story.findOne();
    storyStart = storyStart.id;

    // Step 2 implementation
    // Creating those new fake recommendations.
    // numRecs is the number of recommendations per user.
    // numUsers and numStories are self explanatory.
    // Reviews are just a few fake reviews I created/stole from a website (I'm sure you can tell which is which). Fun idea: make different tiers of reviews you can choose from based on a rating!
    // userStart is to determine the id I would start at
    // storyStart is to determine the id I would start at
    let recArray = makeRecommendations(
      numRecs,
      // This is more of a me problem because I artificially inflated the starting point, so I have to correct for that when determining where to stop
      numUsers + userStart - 1,
      numStories,
      reviews,
      userStart,
      storyStart
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
