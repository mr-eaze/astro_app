var application_root = __dirname,
    express          = require('express'),
    bodyParser       = require('body-parser'),
    path             = require('path'),
    logger           = require('morgan'),
    request          = require('request'),
    models           = require('./models'),
    User             = models.users,
    bcrypt		       = require('bcrypt'),
    session		       = require('express-session'),
    userRouter       = require('./routers/user_router.js'),
    horoscopeRouter  = require('./routers/horoscope_router.js');

var app = express();
require('dotenv').load();

// Server Configuration
app.use( logger('dev') );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );
app.use( express.static( path.join( application_root, 'public' )));
app.use( express.static( path.join( application_root, 'browser' )));

// ROUTERS
app.use('/users', userRouter);
app.use('/horoscope', horoscopeRouter);

// CALLBACK
var restrictAccess = function(req, res, next) {
  var sessionID = parseInt(req.session.currentUser);
  var reqID = parseInt(req.params.id);
  sessionID === reqID ? next() : res.status(401).send({ err: 401, msg: 'YOU SHALL NOT PASS!'});
};

// LOGIN & LOGOUT
app.use(
  session({
    secret: 'Secret Sauce',
    saveUninitialized: false,
    resave: false
  })
);

// CREATE Session
app.post('/sessions', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User
    .findOne({
      where: { username: username }
    })
    .then(function(user) {
      if (user) {
        var passwordDigest = user.password_digest;
        bcrypt.compare(password, passwordDigest, function(err, result) {
          if (result) {
            req.session.currentUser = user.id;
            console.log(req.session.currentUser);
            res.send(user);
          } else {
            res.status(400);
            res.send({
              err: 400,
              msg: 'Incorrect password'
            });
          }
        });
      } else {
        res.status(400);
        res.send({
          err: 400,
          msg: 'Username not found'
        });
      }
    });
});

// END Session
app.delete('/sessions', function(req, res) {
  delete req.session.currentUser;
  res.send({ msg: 'Successfully logged out' });
});

// GET Current User
app.get('/current_user', function(req, res) {
  var userID = req.session.currentUser;
  console.log("HERE")
  User.findOne(userID)
    .then(function(user) {
      res.send(user);
    });
});


// Export app as module
module.exports = app;
