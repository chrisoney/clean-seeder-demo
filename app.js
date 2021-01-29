const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { sequelize } = require('./db/models');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const storiesRouter = require('./routes/stories');
const { restoreUser, requireAuth } = require('./auth');
const methodOverride = require('method-override');
const { session_secret } = require('./config');
const { asyncHandler } = require('./routes/utils');
const { User, Recommendation, Subscription } = require('./db/models')
const app = express();

// view engine setup
app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(methodOverride('_method'));
// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(
  session({
    secret: session_secret,
    store,
    saveUninitialized: false,
    resave: false,
  })
);

// create Session table if it doesn't already exist
store.sync();

app.use(restoreUser)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(requireAuth)
app.use('/stories', storiesRouter);

// Just so I can grab the data before I clear out my database for whatever reason.
app.get("/grabdata", asyncHandler( async(req, res) => {
  const data = await User.findByPk(req.session.auth.userId, {
    include: [{
      model: Subscription,
      as: 'subscriptions',
      order: [
        ["storyId", "ASC"]
      ]
    },
    {
      model: Recommendation,
      as: 'recommendations',
      order: [
        ["storyId", "ASC"]
      ]
    }
  ]
  })
  res.json({ data })
}))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

