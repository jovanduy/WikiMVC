var app = angular.module('robbieApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){

  $routeProvider

	.when("/",
	{
		templateUrl : '../views/home.html',
    	controller: "robbieController"
    })
    
    .when("/page/:id", {
        templateUrl: '../views/page.html',
        controller: "pageController"
    })
    
    .when("/login", {
        templateUrl: '../views/login.html',
        controller: "loginController"
    })
    
    $locationProvider.html5Mode(true);
});

app.controller('robbieController', function ($scope, $http, $location) {
    $scope.pages = [];
    
    $http.get('/pages')
        .then(function (response) {
            $scope.pages = response.data;
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
    
});