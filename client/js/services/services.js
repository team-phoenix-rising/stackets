angular.module('stackets.services', [])
  .factory('Snippets', function ($http) {
    var data;

    var getAllSnippets = function () {
      return $http({
        method: 'GET',
        url: '/api/snippets',
      }).then(function (resp) {
        data = resp.data;
      });
    };

    return {
      getAllSnippets: getAllSnippets
    };
  });
