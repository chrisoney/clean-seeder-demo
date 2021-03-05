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
    
    const startingStories = currentStories;
    const titles = startingStories.map((story) => story.title);

    // Using an api
    let result = [];
    for (let i = 1; i <= 4; i++) {
      const { data } = await api.fictions.getPopular(i);
      const stories = data.map((fic) => {
        const newStory = {};
        newStory.title = fic.title;
        newStory.description = fic.description;
        newStory.link = `https://www.royalroad.com/fiction/${fic.id}`;
        return newStory;
      });
      result.push(...stories);
    }
    result = result.filter((story) => !titles.includes(story.title));
    startingStories.push(...result);
    // I wrote all this data myself so there's no need to set up fake data here
    return queryInterface.bulkInsert('Stories', startingStories, {});
  },

  down: (queryInterface, Sequelize) => {
    // Down function will just drop the whole table
    return queryInterface.bulkDelete('Stories', null, {});
  },
};
