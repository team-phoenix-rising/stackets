//this is a controller for the About us page, but since there is no dynamic information served on that page, this controller is empty.
angular.module('stackets.profile', [])
  .controller('ProfileController', function ($scope, Snippets) {
    Snippets.getUserData(1).then(function(response){
      $scope.name = response.data.name;
      $scope.firstname = response.data.name.split(' ')[0];
      $scope.email = response.data.email;
      $scope.image = response.data.image;
    });

    Snippets.getFavsByUser({userId: 1}).then(function(response) {
      $scope.favorites = response.data;
    });

    Snippets.getSnippetsByUser({userId: 1}).then(function(response) {
      $scope.snippets = response;
    });
  });
