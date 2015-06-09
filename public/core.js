// Angular module and controller as Frontend application

// Module -------------------------------------------------------------------------------------------
var todoModule = angular.module('todoModule', []);

// Controller ---------------------------------------------------------------------------------------

function mainController($scope, $http) {

    // When mainController is associted as a ng-controller this will execute, creating 'todos' binding
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
        })
        .error(function(data) {
            swal("Fail!", "Data could not be loaded!", "error");
        });

    // Function to create to dos.
    $scope.createTodo = function() {
        swal({   
            title: "Add a to do!",   
            text: "Watcha gonna do?",   
            type: "input",   
            showCancelButton: true,   
            closeOnConfirm: false,   
            animation: "slide-from-top",   
            inputPlaceholder: "When they come for you!" 
        }, function(inputValue){   
            if (inputValue === false) 
                return false;      
            if (inputValue === "") {     
                swal.showInputError("You need to write something!");     
                return false   
            }      
            $http.post('/api/todos', {text: inputValue})
            .success(function(data) {
                $scope.todos = data;
                swal("Nice!", "To do: " + inputValue, "success"); 
            })
            .error(function(data) {
                swal("Fail!", "To do " + inputValue + " could not be created", "error"); 
            });
        });
    };

    // Function to delete a to do.
    $scope.deleteTodo = function(id) {
        swal({  title: "Are you sure?",
                text: "You will not be able to recover this to do!",   
                type: "warning",   
                showCancelButton: true,   
                confirmButtonColor: "#DD6B55",   
                confirmButtonText: "Yes, delete it!",   
                closeOnConfirm: false 
            }, 
            function(){   
                $http.delete('/api/todos/' + id)
                    .success(function(data) {
                        $scope.todos = data;
                        swal("Deleted!", "Your to do has been deleted", "success"); 
                    })
                    .error(function(data) {
                        swal("Deleted!", "Your to do has NOT been deleted!", "error"); 
                    });
            });
    };

    // Function to update a to do: priority and done.
    $scope.updateTodo = function (id, priority, done) {
        $http.put('/api/todos/update/' + id, {priority: priority, done: done})
            .success(function(data) {
                $scope.todos = data;
            })
            .error(function(data) {
                swal("Fail!", "To do could not be updated!", "error"); 
            });
    }
}