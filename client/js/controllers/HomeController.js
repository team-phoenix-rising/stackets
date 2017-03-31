//this controller is a placeholder for the homepage, but is not utilized since the home page serves as a static container for all other views.
angular.module('stackets.home', [])
  .controller('HomeController', function ($scope, $http, $location, Snippets) {  	
  	var query = $location.search()
  	var photo = query["photo"];
  	var imageKey = query["oe"];
  	$scope.photo = photo;
  	$scope.username = query["name"];
  	$scope.imageUrl = photo + '&oe=' + imageKey;

  });
