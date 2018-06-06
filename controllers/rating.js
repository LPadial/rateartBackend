//File: controllers/rating.js
var mongoose = require('mongoose');
var Rating  = require('../models/rating');
var bcrypt = require('bcrypt');
var jwt = require('../services/jwt');

//POST - Insert a new rating in the DB
exports.addRating = function(req, res) {
	
	Rating.findOne( {'user': req.user.id}, function(err, rating) {
		if(err) res.send(500, err.message);
		if(!rating){
			var rating = new Rating({
				post : req.params.id,
				value : req.body.value,
				user: req.user.id
			});
		} else {
			rating.value = req.body.value
		}
		rating.save(function(err, rating) {
			if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(rating);
		});
	});
};

exports.findAllRatings = function(req, res) {
	
	Rating.find(function(err, rating) {
		if(err) res.send(500, err.message);
		res.status(200).jsonp(rating);
	});
};

//PUT - Update a register already exists
exports.updateRating = function(req, res) {
	Rating.findById(req.params.id, function(err, rating) {
		rating.value = req.body.value;

		rating.save(function(err) {
			if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(rating);
		});
	});
};


//GET - Return average each post's values 
exports.avgPostValues = function(req, res) {
	Rating.aggregate([
		{
			$match: {
				post: mongoose.Types.ObjectId(req.params.id)
			} 
		},
		{
			$group: {
				_id: "$post",
				average: {$avg: "$value"}
			}
		}
	]).exec(function(err, res) {
		if(err) return res.status(500).send(err.message);
		res.status(200).jsonp(res);
	});
};

//GET - Return a rating with specified ID
exports.findById = function(req, res) {
	Rating.findById(req.params.id, function(err, rating) {
		if(err) return res.send(500, err.message);
		res.status(200).jsonp(rating);
	});
};

//DELETE - Delete a rating with specified ID
exports.deleteRating = function(req, res) {
	Rating.remove({ _id: req.params.id }, function (err) {
		if(err) return res.status(500).send(err.message);
		res.status(200).send("El rating ha sido borrado.");
	});
};
