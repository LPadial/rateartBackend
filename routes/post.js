var express = require('express');
var postController = require('../controllers/post');

var api = express.Router();
var md_checkLogin = require('../middlewares/authenticated');
var md_checkrole = require('../middlewares/permissions');
var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/root/photos')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })

api.route('/postsUser/')
  .get(md_checkLogin.ensureAuth, postController.findAllPostsUser);

api.route('/posts')
  .get(md_checkLogin.ensureAuth, postController.findAllPosts);  

api.route('/post/:id')
  .get(md_checkLogin.ensureAuth, postController.findById)
  .put(md_checkLogin.ensureAuth, postController.updatePost)
  .delete(md_checkLogin.ensureAuth, postController.deletePost);

api.route('/post')
  .post([md_checkLogin.ensureAuth, upload.single('image')], postController.addPost);

api.route('/image/:id')
  .get(postController.returnImageById);

api.route('/countPosts')
  .get(md_checkLogin.ensureAuth, postController.countPostsByUser);

api.route('/avgPostsUser')
  .get(md_checkLogin.ensureAuth, postController.avgPostsUser);

api.route('/ranking')
  .get(md_checkLogin.ensureAuth, postController.avgPostsAllUser);



module.exports = api;