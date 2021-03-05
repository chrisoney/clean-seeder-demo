'use strict';
// These imports are mostly for the purposes of the demo. All I usually care
// about is the currentStories array
const { 
  tempStories, 
  currentStories, 
} = require('../../current.js');

// Dragging in an API I found for a website full of stories
const { RoyalRoadAPI } = require('@l1lly/royalroadl-api');
const api = new RoyalRoadAPI();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 1
    const startingStories = currentStories;

    // Grabbing the titles of stories that I already have to prevent repeats
    const titles = startingStories.map((story) => story.title);

    // Step 2: Using an Api
    // Initializing an empty array
    let result = [];

    // Looping through three times. Each iteration will correspond with grabbing stories from one page of popular stories. That's just how this api works
    for (let i = 1; i <= 3; i++) {
      // Grabbing the data from a trending page
      const { data } = await api.fictions.getPopular(i);

      // Mapping each story's data down to what I need
      const stories = data.map((fic) => {
        const newStory = {};
        newStory.title = fic.title;
        newStory.description = fic.description;
        // This is a bit messy but it's the easiest way to get a working link
        newStory.link = `https://www.royalroad.com/fiction/${fic.id}`;
        return newStory;
      });
      // Adding each story to my array
      result.push(...stories);
    }
    // Step 3: No repeats!
    // Filtering out any results that are repeats of what I have
    result = result.filter((story) => !titles.includes(story.title));

    // Step 4: Combining it all
    // Combining what I collected and what I started with
    startingStories.push(...result);

    // Step 5: Seeding!
    return queryInterface.bulkInsert('Stories', startingStories, {});
  },

  down: (queryInterface, Sequelize) => {
    // Down function will just drop the whole table
    return queryInterface.bulkDelete('Stories', null, {});
  },
};
