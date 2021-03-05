const userStart = 1;
const storyStart = 1;

const altFollows = [
  {
    followerId: userStart,
    followingId: userStart + 1
  },
  {
    followerId: userStart,
    followingId: userStart + 2
  },
  {
    followerId: userStart,
    followingId: userStart + 3
  },
];


const altRecs = [
  {
    rating: 4,
    review: 'Long time between chapters but the world building is top notch',
    userId: userStart,
  },
  {
    rating: 5,
    review: 'Fantastic story, would always recommend.',
    userId: userStart,
  },
  {
    rating: 5,
    review: 'One of my favorites',
    userId: userStart,
  },
  {
    rating: 4,
    review: 'The writing is a bit verbose, but the story is interesting.',
    userId: userStart,
  },
  {
    rating: 5,
    review: 'One of my favorite ongoing stories',
    userId: userStart,
  },
  {
    rating: 3,
    review: 'The writer puts out a ton of great content, but the MC is kinda cringe.',
    userId: userStart,
  },
  {
    rating: 4,
    review: 'Long hiatus but a really funny, dark story',
    userId: userStart,
  },
  {
    rating: 5,
    review: 'Fantastic worldbuilding even if the MC is annoying',
    userId: userStart,
  },
  {
    rating: 5,
    review: `I don't really like space stories but the characters and worldbuilding more and make up for it not being my preference.`,
    userId: userStart,
  },
  {
    rating: 4,
    review: `Really interesting worldbuilding. I can't wait until it 
    starts up again`,
    userId: userStart,
  },
  {
    rating: 5,
    review: `Interesting twists. Unfortunately not being released 
    freely right now`,
    userId: userStart,
  },
  {
    rating: 5,
    review: 'Absolutely hilarious and the world building is pretty impressive',
    userId: userStart,
  },
  {
    rating: 4,
    review: `Overpowered MC but I think it addresses it rather well. I wish they would all stop smirking though.`,
    userId: userStart,
  },
  {
    rating: 4,
    review: `Short story but pretty good`,
    userId: userStart,
  },
  {
    rating: 4,
    review: `Part of the story are really cringey but overall it's entertaining`,
    userId: userStart,
  },
  {
    rating: 4,
    review: 'Childish but funny',
    userId: userStart,
  },
  {
    rating: 3,
    review: 'The ending of book one leaves much to be desired',
    userId: userStart,
  },
  {
    rating: 4,
    review: 'Great writing style. Sometimes it was rather slow-paced',
    userId: userStart,
  },
  {
    rating: 4,
    review: 'Surprisingly entertaining story about an ant',
    userId: userStart,
  },
  {
    rating: 4,
    review: 'Long hiatus. I hope it comes back soon',
    userId: userStart,
  },
  {
    rating: 4,
    review: 'Funny take on quests and fate',
    userId: userStart,
  },
  {
    rating: 3,
    review: 'Interesting magic system, though pretty slow story progression',
    userId: userStart,
  },
  {
    rating: 4,
    review: `Long hiatus, but it should be starting again soon. A more realistic approach to isekai`,
    userId: userStart,
  },
  {
    rating: 4,
    review: 'Not a huge fan of pirate stories but this one won me over',
    userId: userStart,
  },
  {
    rating: 4,
    review: `Another story that isn't my usual cup of tea, but the writing is incredible and the characters are all likeable or well thought out`,
    userId: userStart,
  },
  {
    rating: 1,
    review: 'Had a great start but it was cancelled far too early.',
    userId: userStart,
  },
  {
    rating: 5,
    review: `Hilarious and great world-building. I hope it the story doesn't run out of steam`,
    userId: userStart,
  },
  {
    rating: 5,
    review: `Hilarious and it makes the MC work for his power`,
    userId: userStart,
  },
  {
    rating: 4,
    review: 'Cool concept but it moves rather slowly',
    userId: userStart,
  },
]

const addStoryIdToRecs = () => {
  const result = [];
  for (let i = 0; i < altRecs.length; i++){
    let temp = altRecs[i];
    temp.storyId = storyStart + i;
    result.push(temp);
  }
  return result;
}

const altSubs = [
  {
    book: '1',
    chapter: '221',
    userId: userStart,
  },
  {
    book: '8',
    chapter: '9',
    userId: userStart,
  },
  {
    book: '6',
    chapter: 'Epilogue',
    userId: userStart,
  },
  {
    book: '1',
    chapter: '557',
    userId: userStart,
  },
  {
    book: '1',
    chapter: '135',
    userId: userStart,
  },
  {
    book: '1',
    chapter: '1487',
    userId: userStart,
  },
  {
    book: '1',
    chapter: '(Reboot) 438: Based',
    userId: userStart,
  },
  {
    book: '1',
    chapter: '390',
    userId: userStart,
  },
  {
    book: '3',
    chapter: '41',
    userId: userStart,
  },
  {
    book: '4',
    chapter: 'Epilogue',
    userId: userStart,
  },
  {
    book: '3',
    chapter: '89',
    userId: userStart,
  },
  {
    book: '3',
    chapter: '125',
    userId: userStart,
  },
  {
    book: '1',
    chapter: '634',
    userId: userStart,
  },
  {
    book: '1',
    chapter: 'Completed',
    userId: userStart,
  },
  {
    book: '1',
    chapter: '675',
    userId: userStart,
  },
  {
    book: '1',
    chapter: '247',
    userId: userStart,
  },
  {
    book: '1',
    chapter: 'Epilogue',
    userId: userStart,
  },
  {
    book: '01',
    chapter: 'epilogue',
    userId: userStart,
  },
  {
    book: '1',
    chapter: '695',
    userId: userStart,
  },
  {
    book: '1',
    chapter: '95',
    userId: userStart,
  },
  {
    book: '1',
    chapter: '86',
    userId: userStart,
  },
  {
    book: '1',
    chapter: '86',
    userId: userStart,
  },
  {
    book: '2',
    chapter: '1',
    userId: userStart,
  },
  {
    book: '1',
    chapter: '40',
    userId: userStart,
  },
  {
    book: '1',
    chapter: '100',
    userId: userStart,
  },
  {
    book:'-',
    chapter:'-',
    userId: userStart,
  },
  {
    book:'1',
    chapter:'55',
    userId: userStart,
  },
  {
    book:'2',
    chapter:'11',
    userId: userStart,
  },
  {
    book:'1',
    chapter:'54',
    userId: userStart,
  },
]

const addStoryIdToSubs = () => {
  const result = [];
  for (let i = 0; i < altSubs.length; i++){
    let temp = altSubs[i];
    temp.storyId = storyStart + i;
    result.push(temp);
  }
  return result;
}

module.exports = {
  altFollows,
  addStoryIdToRecs,
  addStoryIdToSubs
}