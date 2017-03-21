angular.module('stackets.searchBar', [])
  .controller('SearchBarController', function ($scope, Snippets) {
    $scope.searchBarLabel = "Search: ";
    $scope.searchSnippet = function (form) {
      //console.log('Calling the addSnippet function from the AddSnippetController...');
      //console.log('Adding: ', JSON.stringify(this.snippet));
      Snippets.searchSnippet(this.search);
      //form.$setPristine();
      //form.$setUntouched();
    };
  });
