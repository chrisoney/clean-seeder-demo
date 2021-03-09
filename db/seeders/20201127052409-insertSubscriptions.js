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
    const values = [];

    // Option 1
    // Bringing in the prebuilt objects
    const startingSubs = currentSubs;

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
    // Query for all of the Stories and limit the attributes down to id and title
    const currentStories = await Story.findAll({
      attributes: ['id', 'title'],
    });
    // Initialize and empty object to hold the data I want to use to search
    const storiesObj = {};
    // Cycle through the stories that I queried for and add a title: id key-value pair for easy reference
    currentStories.forEach((story) => {
      storiesObj[`${story.title}`] = story.id;
    });

    // Looping through each prebuilt sub
    for (let x = 0; x < startingSubs.length; x++) {
      let sub = startingSubs[x];
      // Adding the attributes that won't change to the new sub
      const newSub = { book: sub.book, chapter: sub.chapter }
      // Using the users reference object I created earlier (~line 25)
      newSub.userId = usersObj[sub.user];
      // Using the stories reference object I created earlier (~line 35)
      newSub.storyId = storiesObj[sub.story];
      // Adding this converted sub to the array
      values.push(newSub);
    }

    // Option 2
    // Alt approach
    // values.push(...addStoryIdToSubs());

    // Step 2
    // Grabbing all of the existing recommendations for users that aren't my own account
    // Querying for my user and grabbing the id
    const myUser = await User.findOne({ where: { username: 'chris' } });
    const myId = myUser.id;

    // I decided to build the subs based on the existing recommendations
    // Here I'm just grabbing every recommendation that isn't connected to my user
    let oldArray = await Recommendation.findAll({
      where: {
        userId: {
          [Op.ne]: myId,
        },
      },
    });

    // Step 3
    // Determining the outer bound for book number
    const maxBook = 5;
    // Determining the outer bound for chapter number
    const maxChapter = 30;
    // Using the recommendations to create subscriptions that match
    // I'm looping through the array of recommendations
    for (let i = 0; i < oldArray.length; i++) {
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
      });
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
