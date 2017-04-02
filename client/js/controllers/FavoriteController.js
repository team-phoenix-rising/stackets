angular.module('stackets.favorite', [])
  .controller('FavoriteController', function ($scope, Snippets) {
    $scope.heartClass = 'fa fa-heart-o';
    $scope.isFavorite = false;
    var userId = Snippets.getLoggedInUserData().id;

    if ($scope.snippetid) {
      Snippets.isFavSnippetByUser({snippetId: Number($scope.snippetid), userId: userId}).then(function(response) {
        $scope.isFavorite = !!response.data;
        //Turn favorite class on if there is a response
        toggleFavoriteClass();
      });

      Snippets.getFavsBySnippet({snippetId: Number($scope.snippetid)}).then(function(response) {
        $scope.totalFavorites = response.data.count;
      });
    }


    $scope.toggleFavorite = function() {
      $scope.isFavorite = !$scope.isFavorite;
      if (!$scope.isFavorite) {
        $scope.totalFavorites === 0 ? null : $scope.totalFavorites--;
      } else {
        $scope.totalFavorites++;
      }
      toggleFavoriteClass();
      var data = JSON.stringify({snippetId: $scope.snippetid, userId: userId, status: $scope.isFavorite})
      Snippets.toggleFavorite(data);
    };

    function toggleFavoriteClass() {
      if ($scope.isFavorite) {
        $scope.heartClass = 'fa fa-heart';
      } else {
        $scope.heartClass = 'fa fa-heart-o';
      }
    }

  })
  .directive('favorite', function(){
    return {
      controller: 'FavoriteController',
      template: '<div ng-class="heartClass" ng-click="toggleFavorite()" aria-hidden="true"><span class="sr-only">Click to add to favorites</span></div><span ng-hide="totalFavorites === 0">{{totalFavorites}}</span>',
      scope: {
        snippetid:'@'
      }
    }
  });
