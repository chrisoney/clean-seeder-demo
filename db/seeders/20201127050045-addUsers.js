'use strict';
const bcrypt = require('bcryptjs');
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  // Creating a sample password for the users that I want to keep
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
  // Creating more users

  for (let i = 5; i < 45; i++){
    let newUser = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      // Making the password easy to figure out if I want to log into another user
      hashedPassword: bcrypt.hashSync(`password${i}`, 10),
    }
    users.push(newUser);
  }
  
  // Actually inserting that data into the table
  return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
