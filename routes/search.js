var express = require('express');
var router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');
const { User, Story, Recommendation } = require('../db/models');
const { Op } = require('../db/models').Sequelize;

router.get("/", asyncHandler( async (req,res) =>{
  const { term } = req.query;
  const user = await User.findOne({
      where: { id: req.session.auth.userId },
      include: {
          model: Story,
          where: {
            title: {
              [Op.iLike]: `%${term}%`
            }
          },
          as: 'subscribedStories',
          through: {
              attributes: ["book", "chapter"]
          },
          include: {
              model: Recommendation,
              where: { userId: req.session.auth.userId },
              required: false,
              attributes: ["id", "rating", "review", "userId", "storyId"]
          },
      },
      order: [[ 
          {model: Story, as: 'subscribedStories'}, 
          "id",
          "ASC" 
      ]],
  })
  let stories = [];
  if (user){
    stories = user.subscribedStories;
  }
  // res.render("stories/dashboard", { title:"Dashboard", stories })
  res.json({ stories })
}))

module.exports = router;