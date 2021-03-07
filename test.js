const { User } = require('./db/models');
const { currentRecs } = require('./current');

// Option 1.5
(async () => {
  const startingRecs = currentRecs;
  const currentUsers = await User.findAll({
    attributes: ['id', 'username'],
  });
  const obj = {};
  currentUsers.forEach((ele) => {
    obj[`${ele.username}`] = ele.id;
  });
})();
