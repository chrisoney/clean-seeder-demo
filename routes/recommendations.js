var express = require('express');
var router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');
const { Recommendation } = require('./../db/models');

router.post("/review/update", asyncHandler (async (req, res) => {
  const { review, storyId } = req.body;
  const recommendation = await Recommendation.findOne({
    where: {
      userId: req.session.auth.userId,
      storyId
    }
  });
  if (recommendation){
    recommendation.review = review;
    recommendation.save();
  } else {
    await Recommendation.create({
      userId: req.session.auth.userId,
      storyId,
      review
    })
  }
}))


module.exports = router;