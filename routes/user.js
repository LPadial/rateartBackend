var express = require('express');
var userController = require('../controllers/user');

var api = express.Router();
var md_checkLogin = require('../middlewares/authenticated');
var md_checkrole = require('../middlewares/permissions');

api.route('/users')
	.get(md_checkLogin.ensureAuth, userController.findAllUsers)
	.post(userController.addUser);

api.route('/users/:id')
	.get(userController.findById)
	.put(md_checkLogin.ensureAuth, userController.updateUser);

api.route('/user/login')
	.post(userController.loginUser);

api.route('/user/:id')
	.get(userController.findById)
	.delete([md_checkLogin.ensureAuth, md_checkrole.checkAdminrole], userController.deleteUser);

api.route('/user')
	.post(userController.addUser);

//md_checkLogin.ensureAuth, 
//[md_checkLogin.ensureAuth, md_checkrole.checkAdminrole], 

module.exports = api;