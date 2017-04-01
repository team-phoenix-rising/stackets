angular.module('stackets.signup', [])

.controller('SignUpController', function ($scope, $http, $location, Snippets) {  	
  $scope.signUpUser = function(email, password) {
    $http({
      method: 'POST',
      url: '/signup',
      data: {email: email, password: password}
    }).then(function(response){    
      $window.localStorage.stacketsToken = response.data;    
      console.log($rootScope)
    }, function(err){
      console.log(err)
    });
  }
});