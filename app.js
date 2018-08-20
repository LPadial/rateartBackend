var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
methodOverride = require("method-override");
mongoose = require('mongoose');

var url = "mongodb://localhost:27017/rateart_backend";

//DB connection
mongoose.connect(url);

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// User routes
var user_routes = require('./routes/user');

// Post routes
var post_routes = require('./routes/post');

// Rating routes
var rating_routes = require('./routes/rating');

// Key routes
var key_routes = require('./routes/key');

//You can access to the routes with this links
app.use('/rateart_backend', user_routes);
app.use('/rateart_backend', post_routes);
app.use('/rateart_backend', rating_routes);
app.use('/rateart_backend', key_routes);

//Start node server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
