angular.module('stackets.recentSnippets', [])
  .controller('RecentSnippetsController', function ($scope, Snippets) {
    $scope.recentSnippetsTitle = 'Recent Snippets';
    $scope.data = {};
    Snippets.getRecentSnippets().then(function (snippets) {
      $scope.data.snippets = snippets;
    });
  });
