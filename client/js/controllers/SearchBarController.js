//This controller receives the input of the search bar on the home page and routes it to the search page with the input values automatically fed as a filter.
angular.module('stackets.searchBar', [])
  .controller('SearchBarController', function ($scope, $state, $stateParams, $location, Snippets) {
    $scope.searchBarLabel = "Search: ";
    $scope.searchQuery = '';
    $scope.data = {};
    Snippets.getAllSnippets().then(function (snippets) {
      $scope.data.snippets = snippets;
    });

    $scope.search = function (form) {
      $state.go('search-results', {query: $scope.searchQuery});
    }
  });
