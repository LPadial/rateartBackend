//File: controllers/key.js
var mongoose = require('mongoose');
var Key  = require('../models/key');
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');


//POST - Insert a new key in the DB
exports.addKey = function(req, res) {	
	var key = new Key({
		key : req.body.key,
		pathFile: req.body.pathFile,
		user: req.user.id
	});

	console.log(key)
	key.save(function(err, key) {
		if(err) {
			console.log(err)
			return res.status(500).send(err.message);
		}
		res.status(200).jsonp(key);
	});
};

//GET - Return all keys in the DB
exports.findAllKeys = function(req, res) {
	Key.find(function (err, keys){
		if(err) res.status(500).send(err.message);
		res.status(200).jsonp(keys);
	});
};


//GET - Return a key with specified ID
exports.findById = function(req, res) {
	Key.findById(req.params.id, function(err, key) {
		if(err) res.status(500).send(err.message);
		res.status(200).jsonp(post);
	});
};


//GET - Return user's key in the DB
exports.findKeyUser = function(req, res) {
	Post.findOne({'user': req.user.id}, function (err, key){
		if(err) res.status(500).send(err.message);
		res.status(200).jsonp(key);
	});
};




