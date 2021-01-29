const express = require('express');
const { check, validationResult } = require('express-validator');
const { csrfProtection, asyncHandler } = require('./utils');
const { Story, User, Subscription, Recommendation } = require('../db/models');
const { Op } = require('../db/models').Sequelize;
const followsRouter = require('./follows');
const subscriptionsRouter = require('./subscriptions');
const recommendationsRouter = require('./recommendations')
const searchRouter = require('./search')
const router = express.Router();

router.use("/follows", followsRouter);
router.use("/subscriptions", subscriptionsRouter);
router.use("/recommendations", recommendationsRouter);
router.use("/search", searchRouter);

router.get("/", (req, res) => {
    res.redirect('/dashboard');
})

router.get("/:id(\\d+)", asyncHandler ( async (req, res) => {
    const storyId = req.params.id;
    const story = await Story.findOne({
        where: { id: storyId },
        include: [{
            model: Subscription,
            where: {
                userId: req.session.auth.userId
            },
            required: false,
        },
        {
            model: Recommendation,
            where: {
                userId: req.session.auth.userId
            },
            required: false,
        }
        ]
    })
    const subs = await Subscription.findAll({
        where: {
            storyId,
            userId: {
                [Op.ne]: req.session.auth.userId
            }
        },
        include: {
            model: User,
            attributes: ["username", "id"],
            include: {
                model: User,
                as: 'followers',
                where: { id: req.session.auth.userId },
                required: false
            }
        }
    })
    const recs = await Recommendation.findAll({
        where: {
            storyId,
            userId: {
                [Op.ne]: req.session.auth.userId
            }
        },
        include: {
            model: User,
            attributes: ["username", "id"],
            include: {
                model: User,
                as: 'followers',
                where: { id: req.session.auth.userId },
                required: false
            }
        }
    })
    // res.json({ story })
    res.render("story", { story, subs, recs });
}))

router.get("/create", csrfProtection, asyncHandler( async (req, res) => {
    const errors = [];
    res.render('add-story', { token: req.csrfToken(), errors });
}));

const storyValidators = [
    check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for title')
]

router.post("/create", csrfProtection, storyValidators, asyncHandler( async (req, res) => {
    const errors = []
    const validationErrors = validationResult(req);
    const { title, description, link } = req.body;
    if (validationErrors.isEmpty()){
        const newStory = await Story.create({
            title,
            description,
            link
        });
        await Subscription.create({
            userId: req.session.auth.userId,
            storyId: newStory.id
        })
        res.redirect("/dashboard")
    } else {
        errors.push(...validationErrors.array().map(err => err.msg));
        res.render('add-story', { token: req.csrfToken(), errors });
    }

}))

router.get("/dashboard", asyncHandler( async (req,res) =>{
    const user = await User.findByPk( req.session.auth.userId, {
        include: {
            model: Story,
            as: 'subscribedStories',
            through: {
                attributes: ["book", "chapter", "updatedAt"],
            },
            include: {
                model: Recommendation,
                where: { userId: req.session.auth.userId },
                required: false,
                attributes: ["id", "rating", "review", "userId", "storyId"]
            },
        },
        order: [
            [{ model: Story, as: 'subscribedStories' },
            Subscription,
            "updatedAt", 
            "DESC"]
        ]
    })
    let stories = user.subscribedStories;
    // stories = stories.sort((a,b) => {
    //     return b.Subscription.updatedAt - a.Subscription.updatedAt
    // })
    console.log(res.locals.user.username)
    // let locals = { user: { username: 'Steve '}}
    res.render("dashboard", { title:"Dashboard", stories })
    // res.json({ stories })
}))

router.get("/:storyId/recommendation/", asyncHandler( async (req,res) => {
    const recommendation = await Recommendation.findOne({
        where: {
            userId: req.session.auth.userId,
            storyId: req.params.storyId
        }
    })
    if (!recommendation){
        recommendation = await Recommendation.create({
            userId: req.session.auth.userId,
            storyId: req.params.storyId,
            rating: 0
        })
    }
    res.json({ recommendation })
}))

router.post("/:storyId/recommendation/", asyncHandler( async (req, res) => {
    const { storyId, rating } = req.body;
    const recommendation = await Recommendation.findOne({
        where: {
            userId: req.session.auth.userId,
            storyId,
        }
    })
    if (recommendation){
        recommendation.rating = rating;
        await recommendation.save();
    } else {
        recommendation = await Recommendation.create({
            userId: req.session.auth.userId,
            storyId,
            rating
        })
    }

    res.json( { recommendation });
}))



router.get("/discover", asyncHandler( async (req,res) =>{
    const stories = await Story.findAll({ 
        include: { 
            model:User,
            as: 'subscribingUsers',
            through: { attributes: [] }
        }
    }).filter(story => {
        const users = story.subscribingUsers.map(user => user.id);
        return users.every(id => id !== req.session.auth.userId)
    });

    res.render("discover", { title:"Discover", stories })
}))

router.get("/discover-stories", asyncHandler( async (req,res) =>{
    const stories = await Story.findAll({ 
        include: { 
            model:User,
            as: 'subscribingUsers',
            through: { attributes: [] }
        }
    }).filter(story => {
        const users = story.subscribingUsers.map(user => user.id);
        return users.every(id => id !== req.session.auth.userId)
    });

    res.json(stories);
}))

router.get("/discover-users", asyncHandler( async (req, res) => {
    const users = await User.findAll({
        attributes: ["id", "username"],
        include: [{
            model:User,
            as: 'followers',
            attributes: ["id","username"],
            through: { attributes: []}
        },
        {
            model: Story,
            as: 'recommendedStories',
            through: { attributes: ["id", "rating", "review"]}
        }]
    }).filter(user => {
        const users = user.followers.map(user => user.id);
        return user.id !== req.session.auth.userId && 
                users.every(id => id !== req.session.auth.userId);
    })
    res.json(users);
}))

router.get("/discover-follows", asyncHandler( async (req,res) =>{

    const user = await User.findOne({
        where: {id: req.session.auth.userId},
        include: { 
            model:User,
            as: 'followings',
            attributes: ["id","username"],
            through: { attributes: [] },
            include: { 
                model: Story,
                as: 'recommendedStories',
                through: { attributes: ["id", "rating", "review"] }
            }
        }
    });
    res.json(user.followings);
}));

module.exports = router;
