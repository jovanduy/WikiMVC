var app = angular.module('robbieApp', ['ngRoute']);

// Perfect, I was looking for people to use the routeProvider
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
    $scope.home = true;
    $scope.story = null;
    $scope.user = null;
    $scope.add = null;
    
    // get all of the pages from the database upon loading
    $http.get('/pages')
        .then(function (response) {
            $scope.pages = response.data.pages;
            $scope.user = response.data.user;
    });
    
    $scope.search = function() {
        console.log('Changed');
    }
    
    // display the add page fields
    $scope.showAdd = function () {
        $scope.story = null;
        $scope.home = false;
        $scope.add = true;
    }
    
    // display the home page
    $scope.showHome = function () {
        $scope.story = null;
        $scope.add = false;
        $scope.home = true;
    }
    
    // add a page
    $scope.addPage = function () {
        $http.post('/add', {
            title: $scope.formPageTitle,
            content: $scope.formPageContent,
            timestamp: Date(),
            userCreated: $scope.user.name,
            userLastEdited: $scope.user.name
        })
            .then(function (response) {
                // add new page title to top of list
                // and clear input fields
                $scope.pages.unshift(response.data);
                $scope.formPageTitle = '';
                $scope.formPageContent = '';
            });
    }
    
    // delete a page
    $scope.deletePage = function (index) {
        var id = $scope.pages[index]._id;
        $http.delete('/pages/' + id)
            .then(function (response) {
                $scope.pages.splice(index, 1);
            });
    }
    
    // $scope.getStory = function (index) {
    //     $scope.story = $scope.pages[index];
    //     $scope.story.editing = false;
    //     $scope.home = false;
    //     $scope.add = false;
    // }
    
    $scope.editPage = function(id) {
        $scope.story.editing = true;
    }
    
    $scope.sendEdits = function(index) {
        console.log($scope.story.title);
        $http.put('/pages/' + $scope.story._id, {
            id:$scope.story._id,
            title:$scope.story.title,
            content:$scope.story.content,
            user:$scope.user.name//,
            // timestamp: Date()
            
        })
            .then(function(response) {
                $scope.story.editing = false;
                $scope.pages[index] = $scope.story;
                $scope.getStory($scope.story._id, index)
            });
    };
    
    $scope.getStory = function(id, index) {
        $http.get('/pages/' + id)
            .then(function(response) {
                $scope.story = response.data.pageInfo;
                $scope.story.editing = false;
                $scope.story.index = index;
                $scope.home = false;
                $scope.add = false;
            });
    }

    // $scope.sendEdits = function() {
    //     $http.put('/pages/' + $scope.story._id, {
    //         id:$scope.story._id,
    //         title:$scope.editTitle,
    //         content:$scope.editContent,
    //         user:$scope.user.name
    //     })
    //         .then(function(response) {
    //             $window.location.href = '/';
    //         });
    // };
    
    // $scope.editPage = function(id) {
    //     $window.location.href = '/editPage/' + id;
    // }
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

    // $scope.sendEdits = function() {
    //     $http.post('/edit', {
    //         id:$scope.page._id,
    //         title:$scope.editTitle,
    //         content:$scope.editContent,
    //         user:$scope.user.name
    //     })
    //         .then(function(response) {
    //             $window.location.href = '/';
    //         });
    // };
});

app.controller('redirectController', function ($scope, $http, $location, $window) {
    $window.location.href='/';
});