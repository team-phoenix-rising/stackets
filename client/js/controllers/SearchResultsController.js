angular.module('stackets.searchResults', [])
  .controller('SearchResultsController', function ($scope, $state, $stateParams, Snippets) {
    $scope.searchResultsTitle = 'Search Results';
    $scope.data = {};
    $scope.search = {
      search: $state.params.query || ''
    };
    $scope.search = $state.params.query;
    //console.log($state.params.query);


    Snippets.getAllSnippets().then(function (snippets) {
      $scope.data.snippets = snippets;
    });
  });
