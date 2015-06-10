// Model of to dos.

var mongoose = require('mongoose');				    // To use MongoDB and define models

var Todo = mongoose.model('Todo', {
	text: String,          // Content of the to do (task)
	done: Boolean,         // If the task has been completed
	priority: Number       // Priority of the task
});

module.exports = Todo;