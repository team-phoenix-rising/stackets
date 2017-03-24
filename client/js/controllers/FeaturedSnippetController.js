angular.module('stackets.featuredSnippet', [])
  .controller('FeaturedSnippetController', function ($scope, Snippets) {
    $scope.featuredSnippetTitle = "Featured Snippet";
    $scope.snippet = {};
    Snippets.getSnippetById(4).then(function (snippet) {
      $scope.snippet = snippet;
      $scope.code = JSON.parse(snippet.snippet);
    // Snippets.getfeaturedSnippet().then(function (snippets) {
    //   $scope.snippet.title = snippets.title;
    //   $scope.snippet.TopicId = snippets.TopicId;
    //   $scope.snippet.shortDescription = snippets.shortDescription;
    //   $scope.snippet.snippet = snippets.snippet;
    //   $scope.snippet.description = snippets.description;

     });
  });
