// Models ------------------------------------------------------------------------------------------------------------------------------------

var Todo = require('./models/todo');

// Routes ------------------------------------------------------------------------------------------------------------------------------------

module.exports = function(app) {
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
}
