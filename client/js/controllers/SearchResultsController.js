angular.module('stackets.searchResults', [])
  .controller('SearchResultsController', function ($scope, Snippets) {
    $scope.searchResultsTitle = "Search Results";
    $scope.data = {};
    Snippets.getAllSnippets().then(function (snippets) {
      $scope.data.snippets = snippets;
    });
  });
