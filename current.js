// Only for lecture purposes
const tempRecs = [
  {
    rating: 3,
    review: 'Long hiatuses, but a fun story overall',
    user: 'chris',
    story: 'Dungeon Crawler Carl'
  },
  {
    rating: 4,
    review: 'Long time between chapters but the world building is top notch',
    user: 'chris',
    story: 'Apocalypse: Generic System'
  },
  {
    rating: 5,
    review: 'Fantastic story, would always recommend.',
    user: 'chris',
    story: 'The Wandering Inn'
  },
];

// Only for lecture purposes
const tempSubs = [
  {
    book: '0',
    chapter: '124',
    user: 'chris',
    story: 'Dungeon Crawler Carl'

  },
  {
    book: '2',
    chapter: '9',
    user: 'chris',
    story: 'Apocalypse: Generic System'

  },
  {
    book: '8',
    chapter: '8J',
    user: 'chris',
    story: 'The Wandering Inn'
  },
];

// Only for lecture purposes
const tempStories = [
  {
    title: 'The Wandering Inn',
    description: `An inn is a place to rest, a place to talk and share stories, or a place to find adventures, a starting ground for quests and legends.
    In this world, at least. To Erin Solstice, an inn seems like a medieval relic from the past. But here she is, running from Goblins and trying to survive in a world full of monsters and magic. She'd be more excited about all of this if everything wasn't trying to kill her.
    But an inn is what she found, and so that's what she becomes. An innkeeper who serves drinks to heroes and monsters-
    Actually, mostly monsters. But it's a living, right?
    This is the story of the Wandering Inn.
    `,
    link: 'https://wanderinginn.com/',

  },
  {
    title: 'Delve',
    description: `Delve is an isekai litrpg that follows an average guy who just happened to wake up in a forest one day. He wasn't summoned to defeat the demon lord or to save the world or anything like that, at least as far as he can tell. The only creature there to greet him was a regular old squirrel.
    Soon enough, he meets other people, only to discover that he can't speak the language, and that not everybody immediately trusts random pajama-wearing strangers they met in the middle of the wilderness. Things generally go downhill from there, at least until the blue boxes start appearing.
    Delve is a story about finding your way in a new, strange, and dangerous world. It's about avoiding death, figuring out what the heck is going on, and trying to make some friends along the way. It's not about getting home, so much as finding a new one.
    Did I mention that there will be math?`,
    link: 'https://www.royalroad.com/fiction/25225/delve',

  },
  {
    title: 'Dungeon Crawler Carl',
    description: `A man. His ex-girlfriend's cat. A sadistic game show unlike anything in the universe: a dungeon crawl where survival depends on killing your prey in the most entertaining way possible.
    In a flash, every human-erected construction on Earth-from Buckingham Palace to the tiniest of sheds-collapses in a heap, sinking into the ground.
    The buildings and all the people inside have all been atomized and transformed into the dungeon: an 18-level labyrinth filled with traps, monsters, and loot. A dungeon so enormous, it circles the entire globe.
    Only a few dare venture inside. But once you're in, you can't get out. And what's worse, each level has a time limit. You have but days to find a staircase to the next level down, or it's game over. In this game, it's not about your strength or your dexterity. It's about your followers, your views. Your clout. It's about building an audience and killing those goblins with style.
    You can't just survive here. You gotta survive big.
    You gotta fight with vigor, with excitement. You gotta make them stand up and cheer. And if you do have that 'it' factor, you may just find yourself with a following. That's the only way to truly survive in this game-with the help of the loot boxes dropped upon you by the generous benefactors watching from across the galaxy.
    They call it Dungeon Crawler World. But for Carl, it's anything but a game.`,
    link: 'https://www.royalroad.com/fiction/29358/dungeon-crawler-carl-book-2-carls-doomsday-scenario',

  },
  {
    title: 'The Perfect Run',
    description: `Ryan 'Quicksave' Romano is an eccentric adventurer with a strange power: he can create a save-point in time and redo his life whenever he dies. Arriving in New Rome, the glitzy capital of sin of a rebuilding Europe, he finds the city torn between mega-corporations, sponsored heroes, superpowered criminals, and true monsters. It's a time of chaos, where potions can grant the power to rule the world and dangers lurk everywhere. 
    Ryan only sees different routes; and from Hero to Villain, he has to try them all. Only then will he achieve his perfect ending... no matter how many loops it takes.`,
    link: 'https://www.royalroad.com/fiction/36735/the-perfect-run',

  },
  {
    title: 'Apocalypse: Generic System',
    description: `Jeb Trapper tried to kill himself. The gun jammed.
    Two months later the vet is participating in underground trials of ecstacy to treat his PTSD.
    Everything seemed to be going great until...
    
     >>>The System has Been Installed<<<
    
    Now he's got to choose the difficulty of his tutorial.`,
    link: 'https://www.royalroad.com/fiction/35669/apocalypse-generic-system',

  },
];

// Hardcoded data for my own account
const currentRecs = [
  {
    rating: 4,
    review: 'Long time between chapters but the world building is top notch',
    user: 'chris',
    story: 'Worth the Candle'
  },
  {
    rating: 5,
    review: 'Fantastic story, would always recommend.',
    user: 'chris',
    story: 'The Wandering Inn'
  },
  {
    rating: 5,
    review: 'One of my favorites',
    user: 'chris',
    story: 'A Practical Guide To Evil'
  },
  {
    rating: 4,
    review: 'The writing is a bit verbose, but the story is interesting.',
    user: 'chris',
    story: 'Defiance of the Fall'
  },
  {
    rating: 5,
    review: 'One of my favorite ongoing stories',
    user: 'chris',
    story: 'Delve'
  },
  {
    rating: 3,
    review: 'The writer puts out a ton of great content, but the MC is kinda cringe.',
    user: 'chris',
    story: 'The Legend of Randidly Ghosthound'
  },
  {
    rating: 4,
    review: 'Long hiatus but a really funny, dark story',
    user: 'chris',
    story: 'How to Avoid Death on a Daily Basis'
  },
  {
    rating: 5,
    review: 'Fantastic worldbuilding even if the MC is annoying',
    user: 'chris',
    story: 'He Who Fights With Monsters'
  },
  {
    rating: 5,
    review: `I don't really like space stories but the characters and worldbuilding more and make up for it not being my preference.`,
    user: 'chris',
    story: 'Deeper Darker'
  },
  {
    rating: 4,
    review: `Really interesting worldbuilding. I can't wait until it 
    starts up again`,
    user: 'chris',
    story: 'Undermind'
  },
  {
    rating: 5,
    review: `Interesting twists. Unfortunately not being released 
    freely right now`,
    user: 'chris',
    story: 'BeastBorne'
  },
  {
    rating: 5,
    review: 'Absolutely hilarious and the world building is pretty impressive',
    user: 'chris',
    story: 'Dungeon Crawler Carl'
  },
  {
    rating: 4,
    review: `Overpowered MC but I think it addresses it rather well. I wish they would all stop smirking though.`,
    user: 'chris',
    story: 'Azarinth Healer'
  },
  {
    rating: 4,
    review: `Short story but pretty good`,
    user: 'chris',
    story: 'Evil Overlord: The Makening'
  },
  {
    rating: 4,
    review: `Part of the story are really cringey but overall it's entertaining`,
    user: 'chris',
    story: 'Savage Divinity'
  },
  {
    rating: 4,
    review: 'Childish but funny',
    user: 'chris',
    story: 'Wake of the Ravager'
  },
  {
    rating: 3,
    review: 'The ending of book one leaves much to be desired',
    user: 'chris',
    story: 'The Humble Life of a Skill Trainer'
  },
  {
    rating: 4,
    review: 'Great writing style. Sometimes it was rather slow-paced',
    user: 'chris',
    story: 'The Menocht Loop'
  },
  {
    rating: 4,
    review: 'Surprisingly entertaining story about an ant',
    user: 'chris',
    story: 'Chrysalis'
  },
  {
    rating: 4,
    review: 'Long hiatus. I hope it comes back soon',
    user: 'chris',
    story: 'Castle Kingside'
  },
  {
    rating: 4,
    review: 'Funny take on quests and fate',
    user: 'chris',
    story: 'This Quest Is Bullshit'
  },
  {
    rating: 3,
    review: 'Interesting magic system, though pretty slow story progression',
    user: 'chris',
    story: 'Just A Bystander'
  },
  {
    rating: 4,
    review: `Long hiatus, but it should be starting again soon. A more realistic approach to isekai`,
    user: 'chris',
    story: 'The Gilded Hero'
  },
  {
    rating: 4,
    review: 'Not a huge fan of pirate stories but this one won me over',
    user: 'chris',
    story: 'Seaborn'
  },
  {
    rating: 4,
    review: `Another story that isn't my usual cup of tea, but the writing is incredible and the characters are all likeable or well thought out`,
    user: 'chris',
    story: 'A Journey of Black and Red'
  },
  {
    rating: 1,
    review: 'Had a great start but it was cancelled far too early.',
    user: 'chris',
    story: 'Leaves of Terranthir'
  },
  {
    rating: 5,
    review: `Hilarious and great world-building. I hope it the story doesn't run out of steam`,
    user: 'chris',
    story: 'The Perfect Run'
  },
  {
    rating: 5,
    review: `Hilarious and it makes the MC work for his power`,
    user: 'chris',
    story: 'Apocalypse: Generic System'
  },
  {
    rating: 4,
    review: 'Cool concept but it moves rather slowly',
    user: 'chris',
    story: 'Prophecy Approved Companion'
  },
]

// Hardcoded data for my own account
const currentSubs = [
  {
    book: '1',
    chapter: '221',
    user: 'chris',
    story: 'Worth the Candle'
  },
  {
    book: '8',
    chapter: '9',
    user: 'chris',
    story: 'The Wandering Inn'
  },
  {
    book: '6',
    chapter: 'Epilogue',
    user: 'chris',
    story: 'A Practical Guide To Evil',
  },
  {
    book: '1',
    chapter: '557',
    user: 'chris',
    story: 'Defiance of the Fall',
  },
  {
    book: '1',
    chapter: '135',
    user: 'chris',
    story: 'Delve', 
  },
  {
    book: '1',
    chapter: '1487',
    user: 'chris',
    story: 'The Legend of Randidly Ghosthound'
  },
  {
    book: '1',
    chapter: '(Reboot) 438: Based',
    user: 'chris',
    story: 'How to Avoid Death on a Daily Basis',
  },
  {
    book: '1',
    chapter: '390',
    user: 'chris',
    story: 'He Who Fights With Monsters',
  },
  {
    book: '3',
    chapter: '41',
    user: 'chris',
    story: 'Deeper Darker',
  },
  {
    book: '4',
    chapter: 'Epilogue',
    user: 'chris',
    story: 'Undermind',
  },
  {
    book: '3',
    chapter: '89',
    user: 'chris',
    story: 'BeastBorne',
  },
  {
    book: '3',
    chapter: '125',
    user: 'chris',
    story: 'Dungeon Crawler Carl',
  },
  {
    book: '1',
    chapter: '634',
    user: 'chris',
    story: 'Azarinth Healer',
  },
  {
    book: '1',
    chapter: 'Completed',
    user: 'chris',
    story: 'Evil Overlord: The Makening',
  },
  {
    book: '1',
    chapter: '675',
    user: 'chris',
    story: 'Savage Divinity',
  },
  {
    book: '1',
    chapter: '247',
    user: 'chris',
    story: 'Wake of the Ravager',
  },
  {
    book: '1',
    chapter: 'Epilogue',
    user: 'chris',
    story: 'The Humble Life of a Skill Trainer',
  },
  {
    book: '01',
    chapter: 'epilogue',
    user: 'chris',
    story: 'The Menocht Loop',
  },
  {
    book: '1',
    chapter: '695',
    user: 'chris',
    story: 'Chrysalis',
  },
  {
    book: '1',
    chapter: '95',
    user: 'chris',
    story: 'Castle Kingside',
  },
  {
    book: '1',
    chapter: '86',
    user: 'chris',
    story: 'This Quest Is Bullshit',
  },
  {
    book: '1',
    chapter: '86',
    user: 'chris',
    story: 'Just A Bystander',
  },
  {
    book: '2',
    chapter: '1',
    user: 'chris',
    story: 'The Gilded Hero',
  },
  {
    book: '1',
    chapter: '40',
    user: 'chris',
    story: 'Seaborn',
  },
  {
    book: '1',
    chapter: '100',
    user: 'chris',
    story: 'A Journey of Black and Red',
  },
  {
    book:'-',
    chapter:'-',
    user: 'chris',
    story: 'Leaves of Terranthir',
  },
  {
    book:'1',
    chapter:'55',
    user: 'chris',
    story: 'The Perfect Run',
  },
  {
    book:'2',
    chapter:'11',
    user: 'chris',
    story: 'Apocalypse: Generic System',
  },
  {
    book:'1',
    chapter:'54',
    user: 'chris',
    story: 'Prophecy Approved Companion',
  },
];

// Hardcoded data for my own account
const currentFollows = [
  {
    follower: 'chris',
    following: 'demo'
  },
  {
    follower: 'chris',
    following: 'worry'
  },
  {
    follower: 'chris',
    following: 'matt'
  },
];

// Hardcoded data for stories
const currentStories = [
  {
    title: 'Worth the Candle',
    description: `A teenager struggling after the death of his best friend finds himself in a fantasy world - one which seems to be an amalgamation of every Dungeons and Dragons campaign they ever played together. Now he's stuck trying to find the answers to why he's there and what this world is trying to say. The most terrifying answer might be that this world is an expression of the person he was back on Earth.`,
    link: 'https://www.royalroad.com/fiction/25137/worth-the-candle',

  },
  {
    title: 'The Wandering Inn',
    description: `An inn is a place to rest, a place to talk and share stories, or a place to find adventures, a starting ground for quests and legends.
    In this world, at least. To Erin Solstice, an inn seems like a medieval relic from the past. But here she is, running from Goblins and trying to survive in a world full of monsters and magic. She'd be more excited about all of this if everything wasn't trying to kill her.
    But an inn is what she found, and so that's what she becomes. An innkeeper who serves drinks to heroes and monsters-
    Actually, mostly monsters. But it's a living, right?
    This is the story of the Wandering Inn.
    `,
    link: 'https://wanderinginn.com/',

  },
  {
    title: 'A Practical Guide To Evil',
    description: `The Empire stands triumphant.
    For twenty years the Dread Empress has ruled over the lands that were once the Kingdom of Callow, but behind the scenes of this dawning golden age threats to the crown are rising. The nobles of the Wasteland, denied the power they crave, weave their plots behind pleasant smiles. In the north the Forever King eyes the ever-expanding borders of the Empire and ponders war. The greatest danger lies to the west, where the First Prince of Procer has finally claimed her throne: her people sundered, she wonders if a crusade might not be the way to secure her reign. Yet none of this matters, for in the heart of the conquered lands the most dangerous man alive sat across an orphan girl and offered her a knife.
    Her name is Catherine Foundling, and she has a plan.`,
    link: 'https://practicalguidetoevil.wordpress.com/',

  },
  {
    title: 'Defiance of the Fall',
    description: `As Zac was alone in the middle of the forest the world changed. The whole planet was introduced to the so-called multi-verse by an unfeeling System or God. A universe where all races and civilzations fought for power and dominion. 
    Seemingly forgotten by the System, Zac found himself stuck in the wilderness surrounded by deadly beasts. Alone, lost and without answers, he must find the means to survive and get stronger in this new cut-throat reality. `,
    link: 'https://www.royalroad.com/fiction/24709/defiance-of-the-fall',

  },
  {
    title: 'Delve',
    description: `Delve is an isekai litrpg that follows an average guy who just happened to wake up in a forest one day. He wasn't summoned to defeat the demon lord or to save the world or anything like that, at least as far as he can tell. The only creature there to greet him was a regular old squirrel.
    Soon enough, he meets other people, only to discover that he can't speak the language, and that not everybody immediately trusts random pajama-wearing strangers they met in the middle of the wilderness. Things generally go downhill from there, at least until the blue boxes start appearing.
    Delve is a story about finding your way in a new, strange, and dangerous world. It's about avoiding death, figuring out what the heck is going on, and trying to make some friends along the way. It's not about getting home, so much as finding a new one.
    Did I mention that there will be math?`,
    link: 'https://www.royalroad.com/fiction/25225/delve',

  },
  {
    title: 'The Legend of Randidly Ghosthound',
    description: `As the system initializes, the world shifts. Geography is rearranged and mixed, and levels and stats are instituted across the globe. On that night, one young man was walking through an underground tunnel, his mind on the small problems of his easy life. Because of his location during the shift, he starts in a dungeon far above his level, with no knowledge or teacher, or Newbie Village to guide him. Without a class, he struggles simply to survive in this world changed by its new connection to the Nexus.
    But struggle he will, for he is Randidly Ghosthound, and this is only how his legend begins...`,
    link: 'https://www.royalroad.com/fiction/11209/the-legend-of-randidly-ghosthound',

  },
  {
    title: 'How to Avoid Death on a Daily Basis',
    description: `What if you were transported to a fantasy world with no special abilities, no OP weapons and no status screen to boost your stats? Never mind finding the dragon's treasure or defeating the Demon Lord, you only need to worry about one thing-how to stay alive.
    A group of young Brits wake up in a strange, fantastical land with creatures from myth and legend. They are given archaic weapons they don't know how to use and told to do their best.
    Convinced it has to be some kind of virtual reality RPG, all the people summoned form parties and set off on their adventures, leaving behind the people nobody wants in their group.
    Story of my life, thinks Colin.`,
    link: 'https://www.royalroad.com/fiction/5288/how-to-avoid-death-on-a-daily-basis',

  },
  {
    title: 'He Who Fights With Monsters',
    description: `Jason wakes up in a mysterious world of magic and monsters. He'll face off against cannibals, cultists, wizards, monsters, and that's just the first day. He's going to need courage, he's going to need wit and he's going to need some magic powers of his own. But first, he's going to need pants.
    Follow Jason as he makes a place for himself in a world that is strange, yet sometimes strangely familiar. He'll meet crime lords and aristocrats, gods and monsters on his path from would-be victim to heroic adventurer. At least, he tries to be heroic. It's hard to be good when all your powers are evil.`,
    link: 'https://www.royalroad.com/fiction/26294/he-who-fights-with-monsters',

  },
  {
    title: 'Deeper Darker',
    description: `Sci-fi dungeon crawler.
    Set in the far future when humanity has reached the stars and finds it is not the first to do so. Alien technology has been left behind by a long dead race. Ancient cities, abandoned starships, temples and fortified bunkers all contain artefacts and devices far in advance of what humans have been able to produce. Technology that feels more akin to magic, so powerful it can allow a single person to dominate a star system. But these relics of another time have been left well-defended and behind bewildering and impenetrable security measures. 
    There are those who are compatible with the alien technology, who can augment themselves to face the evermore extreme protocols in the depths of the alien ruins, and by doing so attain greater power. And there are those who just want to sell what they find to the highest bidder.
    The rewards are high, but you have to be prepared to go further and risk more to discover the greatest secrets of a civilisation that vanished long before the first human walked upright. Secrets that could irrevocably change humanity's future, or end it.`,
    link: 'https://www.royalroad.com/fiction/23290/deeper-darker',

  },
  {
    title: 'Undermind',
    description: `Saskia thought her life was finally getting back on track after the accident. Then she got trolled.
    Now she's up a tree the size of a planet, and all who meet her either run screaming or attack on sight. If everyone would just calm down and stop trying to kill her for one moment, she might get a chance to explain that this has all been a horrible misunderstanding.`,
    link: 'https://www.royalroad.com/fiction/22019/undermind',

  },
  {
    title: 'BeastBorne',
    description: `A new Founder Marked with otherworldly power. An epic quest to build a Sanctum settlement. A fabled class that wields monstrous magics.`,
    link: 'https://www.amazon.com/Beastborne-Founder-Portal-Fantasy-Chronicles-ebook/dp/B08BYZ1BGD',

  },
  {
    title: 'Dungeon Crawler Carl',
    description: `A man. His ex-girlfriend's cat. A sadistic game show unlike anything in the universe: a dungeon crawl where survival depends on killing your prey in the most entertaining way possible.
    In a flash, every human-erected construction on Earth-from Buckingham Palace to the tiniest of sheds-collapses in a heap, sinking into the ground.
    The buildings and all the people inside have all been atomized and transformed into the dungeon: an 18-level labyrinth filled with traps, monsters, and loot. A dungeon so enormous, it circles the entire globe.
    Only a few dare venture inside. But once you're in, you can't get out. And what's worse, each level has a time limit. You have but days to find a staircase to the next level down, or it's game over. In this game, it's not about your strength or your dexterity. It's about your followers, your views. Your clout. It's about building an audience and killing those goblins with style.
    You can't just survive here. You gotta survive big.
    You gotta fight with vigor, with excitement. You gotta make them stand up and cheer. And if you do have that 'it' factor, you may just find yourself with a following. That's the only way to truly survive in this game-with the help of the loot boxes dropped upon you by the generous benefactors watching from across the galaxy.
    They call it Dungeon Crawler World. But for Carl, it's anything but a game.`,
    link: 'https://www.royalroad.com/fiction/29358/dungeon-crawler-carl-book-2-carls-doomsday-scenario',

  },
  {
    title: 'Azarinth Healer',
    description: `A new world with nearly unlimited possibilities. A status, classes, magic and monsters. Sounds good? Well, for Ilea it didn't come quite as expected as for some other protagonists, nor was there a king or god to welcome her.
    The grand quest? Well, she might figure that out someday but for now, a new world with new food is prize enough. Her fists at the ready, she's prepared to punch and get punched, however long it takes and however many limbs she might have to regrow.
    A story I've started writing now quite a while ago. Transported to another world, somewhat standard fantasy setting with my beginner attempts to make it dark but funny. There are Litrpg elements here but I do hope it's not too heavy and annoying. The fights should be interesting and aren't just numbers vs numbers.`,
    link: 'https://www.royalroad.com/fiction/16946/azarinth-healer',

  },
  {
    title: 'Evil Overlord: The Makening',
    description: `If evil was easy, everybody would be doing it, and there would be more Dark Lords running around than you could shake a stick at. But the road to Utter Domination isn't easy, smooth or straight, as the boy who will one day become Gar the Pitiless will discover.`,
    link: 'https://www.royalroad.com/fiction/29540/evil-overlord-the-makening',

  },
  {
    title: 'Savage Divinity',
    description: `A modern man finds himself reincarnated in the body of a young slave with no skills and quickly fading memories. Follow his journey to find normalcy while living in a savage world, filled with myth and legends, monsters and Demons. In a land where the strong rule, the weak serve, and bloodshed is a way of life, peace is a luxury few can afford.`,
    link: 'https://www.royalroad.com/fiction/5701/savage-divinity',

  },
  {
    title: 'Wake of the Ravager',
    description: `On the world of Marconen, your first Break determines the trajectory of your life. Calvin chose magic. Without proper schooling or a mentor, the boy is dragged by the whims of fate across the face of the planet, blending together different schools of magic and powerful abilities to create something new.
    But there's a deeper secret behind his success. Why was he born an exile from his country? Why is his System so strange, and why does it keep talking to him?
    And as the march of time continues, something evil grows in power across the ocean.`,
    link: 'https://www.royalroad.com/fiction/25878/wake-of-the-ravager',

  },
  {
    title: 'The Humble Life of a Skill Trainer',
    description: `On the world of Marconen, your first Break determines the trajectory of your life. Calvin chose magic. Without proper schooling or a mentor, the boy is dragged by the whims of fate across the face of the planet, blending together different schools of magic and powerful abilities to create something new.
    But there's a deeper secret behind his success. Why was he born an exile from his country? Why is his System so strange, and why does it keep talking to him?
    And as the march of time continues, something evil grows in power across the ocean.`,
    link: 'https://www.royalroad.com/fiction/25878/wake-of-the-ravager',

  },
  {
    title: 'The Menocht Loop',
    description: `Ian Dunai entered a time loop filled with contagion and captives over three years ago. It turned him into a master of decemancy with domain over dead matter, but he still hasn't found a way to escape.
    Little does he know, he's just been stuck on layer one.`,
    link: 'https://www.royalroad.com/fiction/31514/the-menocht-loop',

  },
  {
    title: 'Chrysalis',
    description: `Anthony has been reborn! Placed into the remarkable game-like world of Pangera.
    However, something seems a little off. What's with these skills? Bite? Dig?
    Wait....
    I've been reborn as a WHAT?!
    Follow Anthony as he attempts to adjust to his new life, to survive and grow in his new Dungeon home!`,
    link: 'https://www.royalroad.com/fiction/22518/chrysalis',

  },
  {
    title: 'Castle Kingside',
    description: `A puzzling encounter leaves Dimitry a beggar with a strange emblem on his wrist. Around him, the people suffer as ruthless organizations, opportunistic nobles, and an overly pious church vie for power in a land under constant siege by some unknown threat. He quickly learns the difficulty of life in this new world.
    Even upon acclimating to a ruthless society and finding his footing in the unsavory lands, Dimitry discovers that havens don't remain safe for long. He will have to manipulate limited resources and integrate modern scientific understanding with obscure magics to ensure the survival of a crumbling city.
    Can a displaced surgeon become the leader a struggling people need him to be?`,
    link: 'https://www.royalroad.com/fiction/27456/castle-kingside',

  },
  {
    title: 'This Quest Is Bullshit',
    description: `The Questing Stones have come to Nowherested, and Evelia Greene is finally ready to receive her life's quest.  Perhaps she'll be a great warrior, or a wealthy merchant, or a brilliant mage.  Perhaps her quest is simply to live a quiet life, constantly honing a craft to the heights of perfection.  
    Or perhaps the Questing Stones will grant her the legendary mission of popping over to the next village to pick up a loaf of bread.  
    Either way, adventure is out there, and Eve is determined to have one.  `,
    link: 'https://www.royalroad.com/fiction/33801/this-quest-is-bullshit',

  },
  {
    title: 'Just A Bystander',
    description: `Everyone wants to believe they are the hero of their own story. But in a world where prophecies are real, what happens if you're not the Chosen One?
    A budding arcanist named Caden enrols in the Academy, entering the same cohort as one of the legendary Chosen Ones, and finds himself caught in a tangle of fate that threatens to unravel the entire Empire. `,
    link: 'https://www.royalroad.com/fiction/32123/just-a-bystander',

  },
  {
    title: 'The Gilded Hero',
    description: `To be summoned to another world, arriving in plane of existence filled with magic and potential! Already, you've been given the great privilege of becoming a [Hero] and the honored task of defeating the demon king! Some people might call that the opportunity of a lifetime!
    With the chance to learn to become a master of the sword, to grow more powerful than anyone on Earth could ever dream, what's not to love about being a hero? It's just like the King said: this is destiny calling! This is what you were born to become!
    Or... not.`,
    link: 'https://www.royalroad.com/fiction/29286/the-gilded-hero',

  },
  {
    title: 'Seaborn',
    description: `Domenic is a sailor who just wants a life at sea. A brewing war between nations turn the already dangerous seas into something perilous. Domenic is forced into an untenable position, one he escapes with his life - though there is a greater cost he'll have to pay after his deal with the devil.
    Join Domenic as he explores the meaning and cost of both servitude and freedom!`,
    link: 'https://www.royalroad.com/fiction/30131/seaborn',

  },
  {
    title: 'A Journey of Black and Red',
    description: `Where am I? What is this! I... I don't remember anything. I am in chains? Why am I in chains?! And why am I so very...
    Thirsty.
    
    This is a story of vampires as I believe they should be, with their strengths and weaknesses, with their remnants of humanity and the beast inside.`,
    link: 'https://www.royalroad.com/fiction/26675/a-journey-of-black-and-red',

  },
  {
    title: 'Leaves of Terranthir',
    description: `Leaves of Terranthir is a gamelit blend of ARPG, action, fantasy, and slice of life.
    It's inspired in part by some of my favourite games, borrowing in themes, sense of exploration, and aesthetics from the Soulsborne and soulslike genre, mixed heavily with arpg itemization from Diablo/PoE style games.
    While many may remember their Soulslike experiences as nothing more than suffering, I personally loved the sense of progression, to prevail over challenges and monsters that seemed impossible to defeat at first.
    If any of that seems interesting to you, do check out the first chapter and let me know what you think.
    Cheers, and thanks for reading.`,
    link: 'https://www.royalroad.com/fiction/35885/leaves-of-terranthir',

  },
  {
    title: 'The Perfect Run',
    description: `Ryan 'Quicksave' Romano is an eccentric adventurer with a strange power: he can create a save-point in time and redo his life whenever he dies. Arriving in New Rome, the glitzy capital of sin of a rebuilding Europe, he finds the city torn between mega-corporations, sponsored heroes, superpowered criminals, and true monsters. It's a time of chaos, where potions can grant the power to rule the world and dangers lurk everywhere. 
    Ryan only sees different routes; and from Hero to Villain, he has to try them all. Only then will he achieve his perfect ending... no matter how many loops it takes.`,
    link: 'https://www.royalroad.com/fiction/36735/the-perfect-run',

  },
  {
    title: 'Apocalypse: Generic System',
    description: `Jeb Trapper tried to kill himself. The gun jammed.
    Two months later the vet is participating in underground trials of ecstacy to treat his PTSD.
    Everything seemed to be going great until...
    
     >>>The System has Been Installed<<<
    
    Now he's got to choose the difficulty of his tutorial.`,
    link: 'https://www.royalroad.com/fiction/35669/apocalypse-generic-system',

  },
  {
    title: 'Prophecy Approved Companion',
    description: `Qube is an NPC in an AI-driven VR-RPG who avoids her scripted death and blithely continues following the Player, trying to make sense of the normalised nonsense of Fantasy RPGs and accidentally glitching out the world in stranger and stranger ways as she seeks to be the very best Childhood Companion ever.
    It's a loving parody of old school RPGs, high fantasy, and every gamer who has ever thought “what happens if I do this...”`,
    link: 'https://www.royalroad.com/fiction/35549/prophecy-approved-companion',

  },
]


module.exports = { 
  currentRecs, 
  currentSubs, 
  currentFollows, 
  currentStories, 
  tempRecs, 
  tempSubs, 
  tempStories 
};