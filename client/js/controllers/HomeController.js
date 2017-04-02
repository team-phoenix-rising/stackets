//this controller is a placeholder for the homepage, but is not utilized since the home page serves as a static container for all other views.

angular.module('stackets.home', [])
  .controller('HomeController', function ($scope, $http, $window, $location, Snippets) {
  	var query = $location.search()
    if( query["token"] ) {
      $window.localStorage.stacketsToken = query["token"];
      $window.localStorage.userId = query["id"];
    }
  	var photo = query["photo"];
  	var imageKey = query["oe"];
    var userId = $window.localStorage.userId;
    if ($window.localStorage.userId) {
      Snippets.logIn(userId);
    }
  	$scope.photo = photo;
  	$scope.username = query["name"];
  	//$scope.username = Snippets.user;
  	$scope.imageUrl = photo + '&oe=' + imageKey;
  	$scope.show = true;
  	$scope.toggleShow = function() {
  		$scope.show = $scope.show ? false : true;
  	}
  	$scope.loginUser = function(email, password) {
		$http({
	        method: 'POST',
	        url: '/login',
	        data: {email: email, password: password}
		}).then(function(response){
		  $scope.loggedUserEmail = response.data.userEmail;
    }, function(err) {
      console.log(err)
    });
  }
});
