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
    $scope.story = null;
    $scope.user = null;
    
    $http.get('/pages')
        .then(function (response) {
            $scope.pages = response.data.pages;
            $scope.user = response.data.user;
    });
    
    $scope.addPage = function () {
        $http.post('/add', {
            title: $scope.formPageTitle,
            content: $scope.formPageContent,
            timestamp: Date()
        })
            .then(function (response) {
                $scope.pages.unshift(response.data);
                $scope.formPageTitle = '';
                $scope.formPageContent = '';
            });
    }
    
    $scope.deletePage = function (index) {
        var id = $scope.pages[index]._id;
        $http.delete('/pages/' + id)
            .then(function (response) {
                $scope.pages.splice(index, 1);
            });
    }

    $scope.getStory = function(id) {
        $http.get('/page/' + id)
            .then(function(response) {
                $scope.story = response.data;
            });
    }
});