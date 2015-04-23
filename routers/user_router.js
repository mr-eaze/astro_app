var express = require('express'),
		models	= require('../models'),
		bcrypt	= require('bcrypt'),
		User    = models.users;

var userRouter = express.Router();

// Callback
var restrictAccess = function(req, res, next) {
  var sessionID = parseInt(req.session.currentUser);
  var reqID = parseInt(req.params.id);
  sessionID === reqID ? next() : res.status(401).send({ err: 401, msg: 'YOU SHALL NOT PASS!'});
};

// GET / SHOW all Users
userRouter.get('/', function(req, res) {
	User
		.findAll()
		.then(function(users) {
			res.send(users);
		});
});

// GET / SHOW User by Id
userRouter.get('/:id',  function(req, res) {
	User
		.findOne({ where: {id: req.params.id} })
		.then(function(user) {
			res.send(user);
		});
});

// POST / CREATE User
userRouter.post('/', function(req, res) {
  bcrypt.hash(req.body.password_digest, 10, function(err, hash) {
    User
      .create({
        username: req.body.username,
        password_digest: hash,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birth_date: req.body.birth_date,
        sun_sign: req.body.sun_sign,
        email_address: req.body.email_address,
        email_reminder: req.body.email_reminder 
      })
      .then(function(user) {
        res.send(user);
      });
  });
});

// PUT / UPDATE User
userRouter.put('/:id', function(req, res) {
	bcrypt.hash(req.body.password, 10, function(err, hash) {
		User
			.findOne({
				where: { id: req.params.id }
			})
			.then(function(user) {
				user
					.update({
        		username: req.body.username,
        		password_digest: hash,
        		first_name: req.body.first_name,
        		last_name: req.body.last_name,
        		birth_date: req.body.birth_date,
        		sun_sign: req.body.sun_sign,
        		email_address: req.body.email_address,
        		email_reminder: req.body.email_reminder 
					})
					.then(function(updatedUser) {
						res.send(updatedUser);
					});
			})
	});
});

// DELETE User
userRouter.delete('/:id', function(req, res) {
	User
		.findOne(req.params.id)
		.then(function(user) {
			user
				.destroy()
				.then(function() {
					delete req.session.currentUser;
					res.send(user);
				});
		});
});

// Export User as module
module.exports = userRouter;












