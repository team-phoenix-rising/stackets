//recent results controller serves the dynamic data that goes into the recent snippets list shown on the home page.
angular.module('stackets.recentSnippets', [])
  .controller('RecentSnippetsController', function ($scope, Snippets) {
    $scope.recentSnippetsTitle = 'Recent Snippets';
    $scope.data = {};
    Snippets.getRecentSnippets().then(function (snippets) {
      $scope.data.snippets = snippets;
    });
  });
