angular.module('stackets.view', [])
  .controller('ViewSnippetController', function ($scope, Snippets, $stateParams) {
    console.log('Viewing Snippet No. ', $stateParams.id);
  });
