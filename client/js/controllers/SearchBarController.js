angular.module('stackets.searchBar', [])
  .controller('SearchBarController', function ($scope, Snippets) {
    $scope.searchBarLabel = "Search: ";
    $scope.data = {};
    Snippets.getAllSnippets().then(function (snippets) {
      $scope.data.snippets = snippets;
    });
      //console.log('Calling the addSnippet function from the AddSnippetController...');
      //console.log('Adding: ', JSON.stringify(this.snippet));
  });
