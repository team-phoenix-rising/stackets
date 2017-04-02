angular.module('stackets.home', [])
  .controller('HomeController', function ($scope, $http, $window, $location, Snippets) {
    $scope.loggedIn = Snippets.getLogStatus();
    Snippets.authenticate().then(function(response) {
      console.log('autehnticating', $scope.loggedIn)     
      if( $window.localStorage.stacketsToken ) {          
        $scope.loggedIn = Snippets.setLogStatus();
        $scope.username = response.data.name;
        $scope.imageUrl = response.data.photo;
        $scope.loggedIn = Snippets.getLogStatus();        
      }       
    }, function(err) {
      console.log(err);
    });

    var query = $location.search()
    if( query["token"] ) {
      $window.localStorage.stacketsToken = query["token"];
      $window.localStorage.userId = query["id"];
    	$scope.username = query["name"];  	
    	$scope.imageUrl = query["photo"] + '&oe=' + query["oe"];
    }
    
    var userId = $window.localStorage.userId;
    if ($window.localStorage.userId) {
      Snippets.logIn(userId);
    }

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
