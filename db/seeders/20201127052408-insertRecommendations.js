'use strict';
// tempRecs is just for demo lecture purposes
const { tempRecs, currentRecs } = require('../../current.js');
// importing these so we can query those tables for counts
const { User, Story } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Pulling in the recommendations that I wrote myself
    let values = currentRecs;

    // Making new recommendations with the number of reviews per user, 
    // number of users I have, number of stories I have, fake reviews, and id to start at
    function makeRecommendations(number, user, story, reviews, start) {
      const result = [];
      // Looping through all the users except the first one to add reviews for
      // them 
      for (let k = start; k <= user; k++){
        // Keeping track of which stories this user has reviewed
        let stories = [];
        for (let i = 0; i < number; i++){
          // Grabbing a random review index
          let spot = Math.floor(Math.random() * reviews.length)
          // Grabbing a random story
          let storyId =  Math.floor(Math.random() * story) + 1;
          // Making sure this user hasn't reviewed this story yet
          while (stories.includes(storyId)) storyId =  Math.floor(Math.random() * story) + 1;
          // Adding the id of the story so we can check against it later on
          // when randomly grabbing a story id
          stories.push(storyId);
          result.push({
            // completely random rating
            rating: Math.floor(Math.random() * 5) + 1,
            // Grabbing the review with the index we generated a few lines ago
            review: reviews[spot],
            userId: k,
            storyId,
          });
        }
      }
      return result;
    }
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
    ]
    // Querying to figure out how many users and stories I've seeded dynamically
    const numUsers = await User.count();
    const numStories = await Story.count();
    const numReviews = 5;
    let start = await User.findOne();
    start = start.id + 1;
    // Grabbing those new fake recommendations. 5 is the number of recommendations
    // per user. numUsers and numStories are self explanatory. Reviews are just
    // a few fake reviews I created/stole from a website (I'm sure you can tell
    // which is which). Fun idea: make different tiers of reviews you can choose
    // from based on a rating!
    let recArray = makeRecommendations(numReviews, numUsers, numStories, reviews, start);
    // Combining what I wrote myself with what I used the function to create
    values.push(...recArray);

    // The actual seeding
    return queryInterface.bulkInsert('Recommendations', values, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Recommendations', null, {});
  }
};
