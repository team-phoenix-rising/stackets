angular.module('stackets.popularSnippets', [])
  .controller('PopularSnippetsController', function ($scope, Snippets) {
    $scope.popularResultsTitle = 'Popular Snippets';
    $scope.data = {};
    Snippets.getAllSnippets().then(function (snippets) {
      $scope.data.snippets = snippets;
    });
  });
