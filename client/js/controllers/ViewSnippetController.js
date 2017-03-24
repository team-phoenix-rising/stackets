angular.module('stackets.view', [])
  .controller('ViewSnippetController', function ($scope, Snippets, $stateParams) {
    console.log('Viewing Snippet No. ', $stateParams.id);
    $scope.snippet = {};
    $scope.code = '';
    Snippets.getSnippetById($stateParams.id).then(function (snippet) {
      $scope.snippet = snippet;
      $scope.code = JSON.parse(snippet.snippet);
      
      //console.log('Metadata retrieved from Snippets service: ', JSON.stringify(topics));
    });

  });
