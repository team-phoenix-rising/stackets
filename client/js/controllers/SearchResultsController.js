angular.module('stackets.searchResults', [])
  .controller('SearchResultsController', function ($scope, $state, $stateParams, Snippets) {
    $scope.searchResultsTitle = 'Search Results';
    $scope.data = {};
    $scope.search = {
      search: ''
    };

    console.log($state.params.query);

    Snippets.getAllSnippets().then(function (snippets) {
      $scope.data.snippets = snippets;
    });
  });
