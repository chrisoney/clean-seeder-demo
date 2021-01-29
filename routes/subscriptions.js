var express = require('express');
var router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');
const { Subscription } = require('../db/models');

router.post("/toggle", asyncHandler( async (req, res) => {
  const { oldStoryId } = req.body;
  const storyId = parseInt(oldStoryId, 10);
  const userId = req.session.auth.userId;
  const subscription = await Subscription.findOne({
    where: {userId, storyId}
  })
  if (subscription){
    await subscription.destroy();
  } else {
    await Subscription.create({ userId, storyId });
  }
  res.send({ message: 'Success!' })
 }))

 router.put("/update", asyncHandler( async (req, res) => {
   const { book, chapter, id } = req.body;
   const subscription = await Subscription.findOne({
     where: { userId: req.session.auth.userId, storyId: id}
   });
   if (book !== '') {
    subscription.book = book;
   }
   if (chapter !== '') {
    subscription.chapter = chapter;
   }
   await subscription.save();

   res.json({ subscription })
 }))


module.exports = router;