var express = require('express');
var postController = require('../controllers/post');

var api = express.Router();
var md_checkLogin = require('../middlewares/authenticated');
var md_checkrole = require('../middlewares/permissions');

api.route('/posts/:id')
  .get(md_checkLogin.ensureAuth, postController.findAllPostsUser);  

api.route('/post/:id')
  .get(md_checkLogin.ensureAuth, postController.findById)
  .put(md_checkLogin.ensureAuth, postController.updatePost)
  .delete(md_checkLogin.ensureAuth, postController.deletePost);

api.route('/post')
  .post(md_checkLogin.ensureAuth, postController.addPost);

/*api.route('/posts')
  .get(md_checkLogin.ensureAuth, postController.findAllPosts);*/

module.exports = api;