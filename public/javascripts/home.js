var app = angular.module('robbieApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){

  $routeProvider

	.when("/",
	{
		templateUrl : '../views/home.html',
    	controller: "robbieController"
    })
    
    $locationProvider.html5Mode(true);
});

app.controller('robbieController', function ($scope, $http, $location) {
    $scope.pages = [];
    
    $http.get('/pages')
        .then(function (response) {
            console.log(response.data);
            $scope.pages = response.data;
    });

    
    // $scope.getTotalTodos = function () {
    //     // return $scope.todos.length;
    //     var activeTodos = $scope.todos.filter(function (todo) {
    //         return !todo.done;
    //     });
    //     return activeTodos.length;
    // }
    
    // $scope.clearCompleted = function () {
    //     $scope.todos = $scope.todos.filter(function (todo) {
    //         return !todo.done;
    //     });
    //     return $scope.todos;
    // }
    
    // $scope.addTodo = function () {
    //     $scope.todos.push({text:$scope.formTodoText, done:false});
    //     $scope.formTodoText = '';
    // }
    
    // $scope.editTodo = function (todo) {
    //     todo.editing=true;
    // }
    
    // $scope.doneEditing = function (todo) {
    //     todo.editing=false;
    // }
    
    // $scope.filterByCompleted = function (todo) {
    //     if ($scope.show === '' || $scope.show === undefined) {
    //         return true;
    //     } else if (todo.done && $scope.show === 'Completed') {
    //         return true;
    //     } else if (!todo.done && $scope.show === 'Active') {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
});