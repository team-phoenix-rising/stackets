angular.module('stackets.searchBar', [])
  .controller('SearchBarController', function ($scope, Snippets) {
    $scope.searchBarLabel = "Search: ";
  });
