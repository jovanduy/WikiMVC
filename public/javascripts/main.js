var app = angular.module('robbieApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){

  $routeProvider

	.when("/",
	{
		templateUrl : '../views/home.html',
    	controller: "robbieController"
    })

    .when("/editPage/:id", {
        templateUrl: '../views/edit.html',
        controller: 'editController'
    })

    .when("/_=_", {
        templateUrl: '../views/home.html',
        controller: 'redirectController'
    })
    
    $locationProvider.html5Mode(true);
});

app.controller('robbieController', function ($scope, $http, $location, $window) {
    $scope.pages = [];
    $scope.story = null;
    $scope.user = null;
    
    $http.get('/pages')
        .then(function (response) {
            $scope.pages = response.data.pages;
            $scope.user = response.data.user;
    });
    
    $scope.search = function() {
        console.log('Changed');
    }

    $scope.addPage = function () {
        $http.post('/add', {
            title: $scope.formPageTitle,
            content: $scope.formPageContent,
            timestamp: Date(),
            userCreated: $scope.user.name,
            userLastEdited: $scope.user.name
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
                $scope.story = response.data.pageInfo;
            });
    }

    $scope.editPage = function(id) {
        $window.location.href = '/editPage/' + id;
    }
});

app.controller('editController', function ($scope, $http, $location, $routeParams, $window) {
    $scope.page = null;
    $scope.user = null;

    $http.get('/page/' + $routeParams.id)
        .then(function(response) {
            $scope.page = response.data.pageInfo;

            $scope.editTitle = $scope.page.title;
            $scope.editContent = $scope.page.content;

            $scope.user = response.data.user;
        });

    $scope.sendEdits = function() {
        $http.post('/edit', {
            id:$scope.page._id,
            title:$scope.editTitle,
            content:$scope.editContent,
            user:$scope.user.name
        })
            .then(function(response) {
                $window.location.href = '/';
            });
    };
});

app.controller('redirectController', function ($scope, $http, $location, $window) {
    $window.location.href='/';
});