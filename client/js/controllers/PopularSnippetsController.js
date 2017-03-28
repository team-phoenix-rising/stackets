
//This controller is a placeholder for a feature that was not implemented.  The popular snippets was supposed to be a clone of the recent snippets list on the homepage with results ordered by popularity if and when an upvoting system was put in place.
angular.module('stackets.popularSnippets', [])
  .controller('PopularSnippetsController', function ($scope, Snippets) {
    $scope.popularResultsTitle = 'Popular Snippets';
    $scope.data = {};
    Snippets.getAllSnippets().then(function (snippets) {
      $scope.data.snippets = snippets;
    });
  });
