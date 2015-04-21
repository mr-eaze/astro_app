var express = require('express'),
		models	= require('../models'),
		User    = models.users;

var userRouter = express.Router();

// GET all Users
userRouter.get('/', function(req, res) {
	User
		.findAll()
		.then(function(users) {
			res.send(users);
		});
});

// GET User by Id
userRouter.get('/:id', function(req, res) {
	User
		.findOne({ where: {id: req.params.id} })
		.then(function(user) {
			res.send(user);
		});
});

// GET User by Id and Return User Sun Sign
userRouter.get('/:id', function(req, res) {
	User
		.findOne({ where: {id: req.params.id} })
		.then(function(user) {
			res.send(user.sun_sign);
		});
});

// Post User
userRouter.post('/users', function(req, res) {
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    User
      .create({
        username: req.body.username,
        password_digest: hash,
        poops: 0
      })
      .then(function(user) {
        res.send(user);
      });
  });
});

module.exports = userRouter;