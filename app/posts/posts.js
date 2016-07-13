'use strict';

angular.module('myApp.posts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/posts', {
    templateUrl: 'posts/posts.html',
    controller: 'PostsCtrl'
  }).when('/posts/:postId', {
    templateUrl: 'posts/post.html',
    controller: 'PostCtrl'
  })
}])

.controller('PostsCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('https://www.reddit.com/r/photoshopbattles.json?count=25').success(function(response) {
    $scope.posts = response.data.children
    console.log($scope.posts)
  })
}])

.controller('PostCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  $http.get('https://www.reddit.com/r/photoshopbattles/comments/' + $routeParams.postId + '.json').success(function(response) {
    $scope.comments = response[1].data.children
    console.log(response[1].data.children)
  })
}]);
