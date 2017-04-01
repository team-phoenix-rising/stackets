//This controller serves the results of all the snippets to the search page.
angular.module('stackets.searchResults', [])
  .controller('SearchResultsController', function ($scope, $state, $stateParams, Snippets) {
    $scope.searchResultsTitle = 'Search Results';
    $scope.data = {};

    $scope.search = {
      search: $state.params.query || ''
    };
    $scope.search = $state.params.query;

    Snippets.getAllSnippets().then(function (snippets) {
      $scope.data.snippets = snippets;
    });

    if ($state.params.query === 'mysnippets') {
      var userId = Snippets.getLoggedInUserData().id;
      $scope.user = function(snippet) {
        if (Number(snippet.user.id) === Number(userId)) {
          return true;
        }
        return false;
      }
      $state.params.query = '';
    }

  });
