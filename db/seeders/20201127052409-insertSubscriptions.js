'use strict';
// tempSubs is just for demo lecture purposes
const { tempSubs, currentSubs } = require('../../current.js');
const { addStoryIdToSubs } = require('../../alt_approach.js');
// Importing Recommendation so that I can base Subscriptions on what I have
const { Recommendation, User, Story } = require('../models')
// Just used to ignore the seeded data for the user I care about
const { Op } = require('../models').Sequelize;


module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 1
    // Initializing an empty array to hold the converted subs
    let values = [];
    // Bringing in the prebuilt objects
    const startingSubs = currentSubs;
    // Looping through each prebuilt sub
    for (let x = 0; x < startingSubs.length; x++){
      let sub = startingSubs[x];
      // Adding the attributes that won't change to the new sub
      const newSub = { book: sub.book, chapter: sub.chapter }
      // Querying for the sub's user and grabbing the id
      const user = await User.findOne({ where: { username: sub.user } });
      newSub.userId = user.id;
      // Querying for the sub's story and grabbing the id
      const story = await Story.findOne({ where: { title: sub.story } });
      newSub.storyId = story.id;
      // Adding this converted sub to the array
      values.push(newSub);
    }

    // Step 2
    // Grabbing all of the existing recommendations for users that aren't my own account
    // Querying for my user and grabbing the id
    const myUser = await User.findOne({ where: { username: "chris" } })
    const myId = myUser.id;

    // I decided to build the subs based on the existing recommendations
    // Here I'm just grabbing every recommendation that isn't connected to my user
    let oldArray = await Recommendation.findAll({
      where: {
        userId: {
          [Op.ne]: myId
        }
      }
    })

    // Step 3
    // Determining the outer bound for book number
    const maxBook = 5;
    // Determining the outer bound for chapter number
    const maxChapter = 30;
    // Using the recommendations to create subscriptions that match
    // I'm looping through the array of recommendations
    for (let i = 0; i < oldArray.length; i++){
      // Grabbing each recommendation
      let oldObj = oldArray[i];
      // Pushing a object into the array for future seeding
      // Book and chapter numbers are randomized
      // userId and storyId will match the recommendation I'm working off of
      values.push({
        // Completely random book
        book: `${Math.floor(Math.random() * maxBook)}`,
        // Completely random chapter
        chapter: `${Math.floor(Math.random() * maxChapter)}`,
        // We want these last two to be the same as what is in the recommendation
        userId: oldObj.userId,
        storyId: oldObj.storyId,
      })
    }
    
    // Step 4
    // Seeding that new data
    return queryInterface.bulkInsert('Subscriptions', values, {});
  },

  down: (queryInterface, Sequelize) => {
    // Down function will just drop the whole table
    return queryInterface.bulkDelete('Subscriptions', null, {});
  }
};
