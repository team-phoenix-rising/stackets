
//This controller will render the featured snippet on the home page.
angular.module('stackets.featuredSnippet', [])
  .controller('FeaturedSnippetController', function ($scope, Snippets) {
    $scope.featuredSnippetTitle = "Featured Snippet";
    $scope.snippet = {};
    $scope.code = '';

    Snippets.getSnippetById(1).then(function (snippet) {
      $scope.snippet = snippet;
      $scope.code = JSON.parse(snippet.snippet);
     });
  });
