angular.module('stackets.view', [])
  .controller('ViewSnippetController', function ($scope, Snippets, $stateParams) {
    console.log('Viewing Snippet No. ', $stateParams.id);
    $scope.snippet = {};
    Snippets.getSnippetById($stateParams.id).then(function (snippet) {
      $scope.snippet = snippet;
      //console.log('Metadata retrieved from Snippets service: ', JSON.stringify(topics));
    });
  });
