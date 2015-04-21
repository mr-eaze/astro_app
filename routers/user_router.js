var express = require('express'),
		models	= require('../models'),
		User    = models.users;

var userRouter = express.Router();


userRouter.get('/', function(req, res) {
	User
		.findAll()
		.then(function(users) {
			res.send(users);
		});
});

// Get User Sun Sign
userRouter.get('/:id', function(req, res) {
	User
		.findOne({ where: {id: req.params.id} })
		.then(function(user) {
			res.send(user.sun_sign);
		});
});

// userRouter.get('/:sun_sign', function(req, res) {
// 	User
// 		.findOne({ where: {id: req.params.id.sun_sign} })
// 		.then(function(user) {
// 			res.send( user.sun_sign() );
// 		});
// });

// userRouter.post('/', function(req, res) {
// 	User
// 		.create(req.body)
// 		.then(function(user) {
// 			res.send(user);
// 		});
// });

// userRouter.put('/:id', function(req, res) {
// 	User
// 		.findOne(req.params.id)
// 		.then(function(user) {
// 			user.update(req.body)
// 				.then(function(updatedUser) {
// 					res.send(updatedUser);
// 				});
// 		});
// });

// userRouter.delete('/:id', function(req, res) {
// 	User
// 		.findOne(req.params.id)
// 		.then(function(user) {
// 			user.destroy()
// 				.then(function() {
// 					res.send(user);
// 				});
// 		});
// });

module.exports = userRouter;