'use strict';
// Same old bcrypt that we've used before
const bcrypt = require('bcryptjs');
// Faker allows us to generate fake data in a variety of ways
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Step 1
    // Creating a sample password for the users that I want to keep.
    // hashSync is synchronous so we don't have to await it
    const password = bcrypt.hashSync('Hunter12!', 10);
    // Users that I want locked down in my database
    let users = [
      {
        username: 'chris',
        email: 'chris@chris.com',
        hashedPassword: password,
      },
      {
        username: 'demo',
        email: 'demo@demo.com',
        hashedPassword: password,
      },
      {
        username: 'worry',
        email: 'worry@worry.com',
        hashedPassword: password,
      },
      {
        username: 'matt',
        email: 'matt@matt.com',
        hashedPassword: password,
      },
    ];

    // Step 2
    // Creating randomized users
    // This is the number of randomized users I want to create
    const numNewUsers = 45;

    // Each loop will create a new user

    // for (let i = 5; i < numNewUsers; i++) {
    //   // This will be each new user
    //   let newUser = {
    //     username: faker.internet.userName(),
    //     email: faker.internet.email(),
    //     // Making the password easy to figure out if I want to log into another user. The number after password will directly correlate to the id of the user
    //     hashedPassword: bcrypt.hashSync(`password${i}`, 10),
    //   };
    //   users.push(newUser);
    // }

    // Step 3
    // Actually inserting that data into the table
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    // Down function will just drop the whole table
    return queryInterface.bulkDelete('Users', null, {});
  },
};
