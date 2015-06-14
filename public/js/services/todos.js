angular.module('todoService', [])

    // Promise object
    .factory('Todos', function($http) {
        return {
            get : function() {
                return $http.get('/api/todos');
            },
            create : function(todoData) {
                return $http.post('/api/todos', todoData);
            },
            delete : function(id) {
                return $http.delete('/api/todos/' + id);
            },
            update : function (id, todoData) {
            	return $http.put('/api/todos/update/' + id, todoData)
            }
        }
    });
