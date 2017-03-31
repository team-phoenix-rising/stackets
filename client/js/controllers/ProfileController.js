//this is a controller for the About us page, but since there is no dynamic information served on that page, this controller is empty.
angular.module('stackets.profile', [])
  .controller('ProfileController', function ($scope, Snippets) {
    Snippets.getUserData(1).then(function(response){
      $scope.name = response.data.name;
      $scope.email = response.data.email;
      $scope.photo = response.data.photo;
    });

    Snippets.getFavsByUser({userId: 1}).then(function(response) {
      console.log('RESP',response);
      $scope.favorites = response.data;
    });
  });
