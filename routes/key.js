var express = require('express');
var keyController = require('../controllers/key');

var api = express.Router();
var md_checkLogin = require('../middlewares/authenticated');
var md_checkrole = require('../middlewares/permissions');

api.route('/key')
	.get(md_checkLogin.ensureAuth, keyController.findKeyUser)
	.post(md_checkLogin.ensureAuth, keyController.addKey);

api.route('/keys')
	.get(md_checkLogin.ensureAuth, keyController.findAllKeys);


module.exports = api;