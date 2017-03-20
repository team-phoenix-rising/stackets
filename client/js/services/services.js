angular.module('stackets.services', [])
  .factory('Snippets', function ($http) {
    var data;
    var topics;
    var tags;
    var languages;

    var getAllSnippets = function () {
      return $http({
        method: 'GET',
        url: '/api/snippets',
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

    return {
      getAllSnippets: getAllSnippets,
      getAllTopics: getAllTopics,
      getAllTags: getAllTags,
      getAllLanguages: getAllLanguages,
      data: data,
      topics: topics
    };
  });
