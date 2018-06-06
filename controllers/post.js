//File: controllers/post.js
var mongoose = require('mongoose');
var Post  = require('../models/post');
var bcrypt = require('bcrypt');
var jwt = require('../services/jwt');

//POST - Insert a new post in the DB
exports.addPost = function(req, res) {
	var post = new Post({
		image : req.body.image,
		description : req.body.description,
		user: req.body.user
	});

	post.save(function(err, post) {
		if(err) return res.status(500).send(err.message);
		res.status(200).jsonp(post);
	});
};

//PUT - Update a register already exists
exports.updatePost = function(req, res) {
	Post.findById(req.params.id, function(err, post) {
		post.image = req.body.image;
		post.description = req.body.description;

		post.save(function(err) {
			if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(post);
		});
	});
};

//DELETE - Delete a post with specified ID
exports.deletePost = function(req, res) {
	Post.remove({ _id: req.params.id }, function (err) {
		if(err) return res.status(500).send(err.message);
		res.status(200).send("El post ha sido borrado.");
	});
};

//GET - Return all user's posts in the DB
exports.findAllPostsUser = function(req, res) {
	Post.find( {'user': req.params.id}, function(err, posts) {
		if(err) res.send(500, err.message);
		res.status(200).jsonp(posts);
	});
};

//GET - Return all posts in the DB
/*exports.findAllPosts = function(req, res) {
	Post.find(function(err, posts) {
		if(err) res.send(500, err.message);
		res.status(200).jsonp(posts);
	});
};*/

//GET - Return a post with specified ID
exports.findById = function(req, res) {
	Post.findById(req.params.id, function(err, post) {
		if(err) return res.send(500, err.message);
		res.status(200).jsonp(post);
	});
};