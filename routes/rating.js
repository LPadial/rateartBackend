var express = require('express');
var ratingController = require('../controllers/rating');

var api = express.Router();
var md_checkLogin = require('../middlewares/authenticated');
var md_checkrole = require('../middlewares/permissions');

api.route('/avgRatingsPost/:id')
  .get(md_checkLogin.ensureAuth, ratingController.avgPostValues);

api.route('/ratings')
  .get(md_checkLogin.ensureAuth, ratingController.findAllRatings);

api.route('/rating/:id')
  .get(md_checkLogin.ensureAuth, ratingController.findById)
  .put(md_checkLogin.ensureAuth, ratingController.updateRating)
  .post(md_checkLogin.ensureAuth, ratingController.addRating)
  .delete(md_checkLogin.ensureAuth, ratingController.deleteRating);

api.route('/userRatingPost/:id')
	.get(md_checkLogin.ensureAuth, ratingController.getRating);

api.route('/ratingsPost/:id')
	.get(md_checkLogin.ensureAuth, ratingController.getAllRatingsPost);

api.route('/countRatingsPost/:id')
	.get(md_checkLogin.ensureAuth, ratingController.getCountAllRatingsPost);

module.exports = api;