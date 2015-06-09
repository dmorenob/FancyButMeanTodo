// Author: dmorenob
// Version: 0.0.1
//
// Server of our ToDo application. Based on tutorial by scotch.io (https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular)

// Set up the needed dependecies ---------------------------------------------------------------------------------------------------------

var express = require('express');
var app = express();								// Creates the app with express 
var mongoose = require('mongoose');				    // To use MongoDB and define models
var morgan = require('morgan');					    // To log request into console (express4)
var bodyParser = require('body-parser');			// To parse body from POST requests (express4)
var methodOverride = require('method-override');	// To simulate DELETE and PUT requests (express4)

// Configuration -------------------------------------------------------------------------------------------------------------------------

mongoose.connect('mongodb://localhost/todo');		// Connect to local mongoDB database called 'todo'

app.use(express.static(__dirname + '/public'));                 // Set the static files location: /public/img will be /img for users
app.use(morgan('dev'));                                         // Log requests to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // Parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // Parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // Parse application/vnd.api+json as json
app.use(methodOverride());

// Models --------------------------------------------------------------------------------------------------------------------------------

var Todo = mongoose.model('Todo', {
	text: String,          // Content of the to do (task)
	done: Boolean,         // If the task has been completed
	priority: Number       // Priority of the task
});

// API Routes ----------------------------------------------------------------------------------------------------------------------------

// To GET all to dos stored on the DB.
app.get('/api/todos', function(req, res) {
    Todo.find(function(err, todos) { 		// Use mongoose to get all ToDos in the database
        if (err)							// If there is an error retrieving, send the error. Nothing after res.send(err) will execute
            res.send(err)
        res.json(todos); 					// return all todos in JSON format
    });
});

// To create a to do and store it on the DB. If success: returns all to dos stored on the DB.
app.post('/api/todos', function(req, res) {
    Todo.create({							
        text : req.body.text,
        done : false,
        priority: 0
    }, function(err, todo) {
        if (err)
            res.send(err);

        Todo.find(function(err, todos) {	
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});

// To delete a to do from the DB. If success: returns all to dos stored on the DB.
app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
           res.send(err);

        Todo.find(function(err, todos) {
            if (err)
               res.send(err)
            res.json(todos);
        });
    });
});

// To update a to do and store it on the DB. If success: returns all to dos stored on the DB.
app.put('/api/todos/update/:todo_id', function(req, res) {
    Todo.update({_id : req.params.todo_id}, 
    	{ $inc: { priority: req.body.priority }, done: req.body.done}, 
		{ multi: false },
    	function(err, todo) {
       		if (err)
           		res.send(err);

        	Todo.find(function(err, todos) {
            	if (err)
               		res.send(err)
            	res.json(todos);
        	});
    	}
    );
});

// Frontend Routes -----------------------------------------------------------------------------------------------------------------------

app.get('*',function(req,res){
	res.sendfile('./public/index.html');
});

// App listens to port 8080 --------------------------------------------------------------------------------------------------------------
app.listen(8080);
console.log("App listening for the win on port 8080");