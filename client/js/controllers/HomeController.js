//this controller is a placeholder for the homepage, but is not utilized since the home page serves as a static container for all other views.

angular.module('stackets.home', [])
  .controller('HomeController', function ($scope, $http, $window, $location, Snippets) {  	
    $scope.loggedIn = false;
    if( $window.localStorage.stacketsToken ) {
      console.log('home')
      $http({
        method: 'GET',
        url: '/authenticate'
      }).then(function(response) {        
        $scope.loggedIn = true;
        $scope.username = response.data.name;
        $scope.imageUrl = response.data.photo;
      },function(error) {
        console.log('initial query error', error)
      }); 
    }

  	var query = $location.search()    
    if( query["token"] ) {
      $window.localStorage.stacketsToken = query["token"];
      $window.localStorage.userId = query["id"];
      $scope.username = query["name"];
      $scope.imageUrl = query["photo"] + '&oe=' + query["oe"];;      
    }
    
    $scope.show = true;
    var userId = query["id"];
    
    if (userId) {
      Snippets.logIn(userId);
    }
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

  if (query["token"]) {
    $window.localStorage.stacketsToken = query["token"];
  }

  var photo = query["photo"];
  var imageKey = query["oe"];
  var userId = query["id"];

  if (userId) {
    Snippets.logIn(userId);
  }

  $scope.photo = photo;
  $scope.username = query["name"];
  $scope.imageUrl = photo + '&oe=' + imageKey;
  $scope.show = true;

  $scope.toggleShow = function() {
    $scope.show = $scope.show ? false : true;
  }

  $scope.loginUser = function(email, password) {
    $http({
      method: 'POST',
      url: '/login',
      data: {
        email: email,
        password: password
      }
    })
    .then(function(response) {
      $scope.loggedUserEmail = response.data.userEmail;

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
