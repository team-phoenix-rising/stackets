angular.module('stackets.searchBar', [])
  .controller('SearchBarController', function ($scope, $location, Snippets) {
    $scope.searchBarLabel = "Search: ";
    $scope.searchQuery = '';
    $scope.data = {};
    Snippets.getAllSnippets().then(function (snippets) {
      $scope.data.snippets = snippets;
    });

    $scope.search = function (form) {
      console.log('Form: ', form);
      console.log('Search Query: ', $scope.searchQuery);
      $location.path('/search/' + $scope.searchQuery);
    }
  });
