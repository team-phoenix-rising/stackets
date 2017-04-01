//This controller serves the results of all the snippets to the search page.
angular.module('stackets.searchResults', [])
  .controller('SearchResultsController', function ($scope, $state, $stateParams, Snippets, $location) {
    $scope.searchResultsTitle = 'Search Results';
    $scope.data = {};

    $scope.search = {
      search: $state.params.query || ''
    };
    $scope.search = $state.params.query;

    if (!$location.$$path.split('/')[2]) {

      Snippets.getAllSnippets().then(function (snippets) {
        $scope.data.snippets = snippets;
      });

    } else if ($location.$$path.split('/')[2] === 'mysnippets') {
      var userId = Snippets.getLoggedInUserData().id;

      Snippets.getAllSnippets().then(function (snippets) {
        $scope.data.snippets = snippets;
      });

      $scope.user = function(snippet) {
        if (Number(snippet.user.id) === Number(userId)) {
          return true;
        }
        return false;
      }
      $state.params.query = '';
    } else if ($location.$$path.split('/')[2] === 'myfavorites') {
      Snippets.getFavsByUser(2).then(function(response){
        $scope.data.snippets = response.data;
      })
    }

  });
