//File: controllers/post.js
var mongoose = require('mongoose');
var Post  = require('../models/post');
var Rating  = require('../models/rating');
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var PATH = "/root/photos";
var multer  = require('multer');
var upload = multer({ dest: '/root/photos/' });
var path = require('path');
var fs = require('fs');
var fileType = require('file-type');
var readChunk = require('read-chunk');
var dir = path.join(PATH);
var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};



//POST - Insert a new post in the DB
exports.addPost = function(req, res) {	
	var post = new Post({
		image : req.file.path,
		title: req.body.title,
		description : req.body.description,
		//dateUpload : new Date(),
		user: req.user.id
	});

	console.log(post)
	post.save(function(err, post) {
		if(err) {
			console.log(err)
			return res.status(500).send(err.message);
		}
		res.status(200).jsonp(post);
	});
};

//PUT - Update a register already exists
exports.updatePost = function(req, res) {
	Post.findById(req.params.id, function(err, post) {
		post.image = req.body.image;
		post.title = req.body.title;
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

//GET - Return all posts id title description and name user  in the DB
exports.findAllPosts = function(req, res) {
	Post.find({'user': {$ne:req.user.id}}, 'title description dateUpload', {sort: '-dateUpload',limit:20}, function (err, posts){
		if(err) res.status(500).send(err.message);
		res.status(200).jsonp(posts);
	}).populate({path: 'user', select:'name -_id'});
};

//Request por el id del post que devuelve la imagen
exports.returnImageById = function (req, res) {
	Post.findById(req.params.id,function(err, post) {
		if(err) res.status(500).send(err.message);
		if(!post) res.status(500).send({"err": "Post not found"});
		if(!post.image) res.status(500).send({"err": "Image not found"});
		var file = post.image
		console.log(post);

		const buffer = readChunk.sync(file, 0, 4100);
 
		
		var type = fileType(buffer);
		var s = fs.createReadStream(file);
		s.on('open', function () {
			res.set('Content-Type', type);
			
			//res.set('Content-Type', 'image/jpeg');
			s.pipe(res);
		});
		s.on('error', function () {
			res.set('Content-Type', 'text/plain');
			res.status(404).end('Not found');
		});
	});
};

//GET - Return a post with specified ID
exports.findById = function(req, res) {
	Post.findById(req.params.id, function(err, post) {
		if(err) return res.send(500, err.message);
		res.status(200).jsonp(post);
	});
};


//GET - Return number of posts of a specified user
exports.countPostsByUser = function(req, res) {
	Post.count({'user': req.user.id}, function(err, post) {
		if(err) return res.send(500, err.message);
		res.status(200).jsonp(post);
	});
};

//GET - Return all posts of an user -> id title description and name user  in the DB
exports.findAllPostsUser = function(req, res) {
	Post.find({'user': req.user.id}, 'title description dateUpload', {sort: '-dateUpload',limit:20}, function (err, posts){
		if(err) res.send(500, err.message);
		res.status(200).jsonp(posts);
	}).populate({path: 'user', select:'name -_id'});
};


//GET - Return user average  
exports.avgPostsUser = function(req, res) {
	Post.aggregate(
		[
		{
			$match: {user:mongoose.Types.ObjectId(req.user.id)}
		},
		{
			$lookup:
			{
				from: "ratings",
         		localField: "_id",
         		foreignField: "post",
         		as: "ratings"
         	}
        },
        {
        	$unwind: "$ratings"
        },
        {
        	$group:
        	{
        		_id: null,
        		average:{$avg:"$ratings.value"}
        	}
        }
        ]).exec(function(err,average){
        	if(err) res.send(500, err.message);
        	if(average[0]!= null){
        		res.status(200).jsonp(Number.parseFloat(average[0]["average"]).toFixed(2));
        	}else{
        		res.status(200).jsonp("0");
        	}
        });
};


//GET - Return every user average 
exports.avgPostsAllUser = function(req, res) {
	Post.aggregate(
		[
		{
			$lookup:
			{
				from: "ratings",
         		localField: "_id",
         		foreignField: "post",
         		as: "ratings"
         	}

        },
        {
        	$unwind: "$ratings"
        },
        {
        	$group:
        	{
        		_id: {user: "$user"},
        		average:{$avg:"$ratings.value"}
        	}
        },
        {
        	$sort:
        	{
        		average:-1
        	}
        }
        ]).exec(function(err,posts){
       			if(err) res.send(500, err.message);
       			var index;
       			index=posts.findIndex(x=>x._id.user==req.user.id);
       			/*for(i=0;i<posts.length;i++){
       				if(posts._id.user===r){
       					posicion=i;
       				}
       			}*/
				res.status(200).jsonp(index+1);
       		}
    );
}