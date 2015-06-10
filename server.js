// Author: dmorenob
// Version: 0.0.1
//
// Server of our ToDo application. Based on tutorial by scotch.io (https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular)

// Set up the needed dependecies ---------------------------------------------------------------------------------------------------------

var express = require('express');
var app = express();								// Creates the app with express 
var mongoose = require('mongoose');                 // To use MongoDB.
var morgan = require('morgan');					    // To log request into console (express4)
var bodyParser = require('body-parser');			// To parse body from POST requests (express4)
var methodOverride = require('method-override');	// To simulate DELETE and PUT requests (express4)

// Configuration -------------------------------------------------------------------------------------------------------------------------

var database = require('./config/database')         // To have access to our DB urls
mongoose.connect(database.mongo_local);		        // Connect to local mongoDB database called 'todo'

app.use(express.static(__dirname + '/public'));                 // Set the static files location: /public/img will be /img for users
app.use(morgan('dev'));                                         // Log requests to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // Parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // Parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // Parse application/vnd.api+json as json
app.use(methodOverride());

// Routes --------------------------------------------------------------------------------------------------------------------------------

var routes = require('./app/routes');
routes(app);

// App listens to port 8080 --------------------------------------------------------------------------------------------------------------
app.listen(8080);
console.log("App listening for the win on port 8080");