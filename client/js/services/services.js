angular.module('stackets.services', [])
  .factory('Snippets', function ($http) {
    var data;
    var languages;
    var user;

    var user = {
      id: 2,
      email: 'test@test.com',
      name: 'Bryce Dooley',
      image: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13100701_10100422685616885_8866083302877500374_n.jpg?oh=cc19b63962f0e2e4c79732b9fd2d770f&oe=59990398'
    };

    var logIn = function(id) {
      getUserData(id)
      .then(function(response){
        var data = response.data;
        user.email = data.email;
        user.name = data.name;
        user.image = data.image;
        user.id = id;
      });
    }

    var getLoggedInUserData = function() {
      return user;
    }

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

    var getSnippetsByUser = function (data) {
      return $http({
        method: 'GET',
        url: '/api/getSnippetsByUser/' + data.userId
      }).then(function (resp) {
        data = resp.data;
        return data;
      });
    };

    var getFavsBySnippet = function (data) {
      return $http({
        method: 'GET',
        url: '/api/getFavsBySnippet/' +  data.snippetId
      }).then(function (response) {
        return response;
      });
    };

    var getFavsByUser = function (userId) {
      return $http({
        method: 'GET',
        url: '/api/getFavsByUser/' +  userId
      }).then(function (response) {
        return response;
      });
    };

    var isFavSnippetByUser = function (data) {
      return $http({
        method: 'GET',
        url: '/api/isFavSnippetByUser/' +  data.snippetId + '/' + data.userId
      }).then(function (response) {
        return response;
      });
    };

    var toggleFavorite = function (data) {
      return $http({
        method: 'POST',
        url: '/api/favorite',
        data: data
      });
    };

    var getCategories = function() {
      return $http({
        method: 'GET',
        url: '/api/categories'
      }).then(function(response) {
        return response.data;
      })
    };

    var getSubcategories = function(id) {
      return $http({
        method: 'GET',
        url: '/api/sub-categories/' + id
      }).then(function(response) {
        return response.data;
      })
    };

    var getUserData = function (id) {
      console.log('getting user data')
      return $http({
        method: 'GET',
        url: '/api/getUserData/' + id
      });
    };

    var authenticate = function(token) {
      return $http({
        method: 'POST',
        url: '/authenticate',
        data: {webToken: token}
      })
    }

    return {
      addSnippet: addSnippet,
      getAllSnippets: getAllSnippets,
      getAllLanguages: getAllLanguages,
      getRecentSnippets: getRecentSnippets,
      getSnippetById: getSnippetById,
      data: data,
      toggleFavorite: toggleFavorite,
      isFavSnippetByUser: isFavSnippetByUser,
      getFavsBySnippet: getFavsBySnippet,
      getCategories: getCategories,
      getSubcategories: getSubcategories,
      getUserData: getUserData,
      getFavsByUser: getFavsByUser,
      getSnippetsByUser: getSnippetsByUser,
      logIn: logIn,
      getLoggedInUserData: getLoggedInUserData,
      user: user,
      authenticate: authenticate
    };
  });
