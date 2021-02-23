'use strict';
// tempSubs is just for demo lecture purposes
const { tempSubs, currentSubs } = require('../../current.js');
// Importing Recommendation so that I can base Subscriptions on what I have
const { Recommendation, User } = require('../models')
// Just used to ignore the seeded data for the user I care about
const { Op } = require('../models').Sequelize;


module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      {
        book:'0',
        chapter:'',
        userId: 1,
        storyId: ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    */
    // Grabbing sub seeds I created beforehand
    // let values = tempSubs;
    let values = currentSubs;
    // Grabbing all of the existing recommendations for users that aren't my own account
    const myUser = await User.findOne({ where: { username: "chris" } })
    const myId = myUser.id;
    let oldArray = await Recommendation.findAll({
      where: {
        userId: {
          [Op.ne]: myId
        }
      }
    })
    const maxBook = 5;
    const maxChapter = 30;
    // Using the recommendations to create subscriptions that match
    for (let i = 0; i < oldArray.length; i++){
      // We're going based off the recommendations so this just grabs each one
      // after I queried for it
      let oldObj = oldArray[i];
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
    
    // Seeding that new data
    return queryInterface.bulkInsert('Subscriptions', values, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Subscriptions', null, {});
  }
};
