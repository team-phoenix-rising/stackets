angular.module('stackets.services', [])
  .factory('Snippets', function ($http) {
    var data;
    var topics;
    var tags;
    var languages;

    var addSnippet = function (snippet) {
      return $http({
        method: 'POST',
        url: '/api/snippets',
        data: JSON.stringify(snippet)
      });
    };

    var getAllSnippets = function () {
      return $http({
        method: 'GET',
        url: '/api/snippets',
      }).then(function (resp) {
        data = resp.data;
        return data;
      });
    };

    var getRecentSnippets = function () {
      return $http({
        method: 'GET',
        url: '/api/snippets/recent',
        data: {
          limit: 1
        }
      }).then(function (resp) {
        data = resp.data;
        return data;
      });
    };

    var getAllTopics = function () {
      return $http({
        method: 'GET',
        url: '/api/topics',
      }).then(function (resp) {
        topics = resp.data;
        return topics;
      });
    };

    var getAllTags = function () {
      return $http({
        method: 'GET',
        url: '/api/tags',
      }).then(function (resp) {
        tags = resp.data;
        return tags;
      });
    };

    var getAllLanguages = function () {
      return $http({
        method: 'GET',
        url: '/api/languages',
      }).then(function (resp) {
        languages = resp.data;
        return languages;
      });
    };

    var getSnippetById = function (id) {
      return $http({
        method: 'GET',
        url: '/api/snippets/' + id
      }).then(function (resp) {
        data = resp.data;
        return data;
      });
    };

    var getFavoriteStatus = function (id) {
      return $http({
        method: 'GET',
        url: '/api/favorite',
        data: id
      }).then(function (resp) {
        data = resp.data;
        return data;
      });
    };

    var toggleFavorite = function (data) {
      return $http({
        method: 'POST',
        url: '/api/favorite',
        data: data
      });
    };

    return {
      addSnippet: addSnippet,
      getAllSnippets: getAllSnippets,
      getAllTopics: getAllTopics,
      getAllTags: getAllTags,
      getAllLanguages: getAllLanguages,
      getRecentSnippets: getRecentSnippets,
      getSnippetById: getSnippetById,
      data: data,
      topics: topics,
      toggleFavorite: toggleFavorite,
      getFavoriteStatus: getFavoriteStatus
    };
  });
