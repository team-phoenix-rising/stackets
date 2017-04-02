//this is a controller for the About us page, but since there is no dynamic information served on that page, this controller is empty.
angular.module('stackets.profile', [])
  .controller('ProfileController', function ($scope, Snippets) {
    var userInfo = Snippets.getLoggedInUserData();
    var userId = userInfo.id
    $scope.name = userInfo.name;
    $scope.firstname = userInfo.name.split(' ')[0];
    $scope.email = userInfo.email;
    $scope.image = userInfo.image;

    Snippets.getFavsByUser(userId).then(function(response) {
      $scope.favorites = response.data;
      console.log('fav data', response.data);
    });

    Snippets.getSnippetsByUser({userId: userId}).then(function(response) {
      $scope.snippets = response;
    });
  });
