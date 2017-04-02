angular.module('stackets', [
  'stackets.services',
  'stackets.searchBar',
  'stackets.searchResults',
  'stackets.home',
  'stackets.about',
  'stackets.profile',
  'stackets.view',
  'stackets.popularSnippets',
  'stackets.recentSnippets',
  'stackets.addSnippet',
  'stackets.featuredSnippet',
  'stackets.favorite',
  'stackets.signup',
  'stackets.login',
  'ui.router',
  'ui.ace'
]).service('APIInterceptor', function($rootScope, $window) {
  var service = this;
  service.request = function(config) {
    if ($window.localStorage.stacketsToken) {
      config.headers.authorization = $window.localStorage.stacketsToken;
    }
    return config
  }

  service.responseError = function(response) {
    return response
  }
}).config(function($stateProvider, $locationProvider, $httpProvider) {
  $locationProvider.html5Mode({enabled: true, requireBase: false});
  $stateProvider.state('home', {
    name: 'home',
    url: '/',
    data: {
      authorization: false,
      redirectTo: 'home',
      memory: true
    },
    views: {
      'homeView': {
        controller: 'HomeController',
        templateUrl: '../partials/home.html'
      },
      'searchResultsView': {
        controller: 'SearchResultsController',
        templateUrl: '../partials/search-results.html'
      }
    }
  }).state('about', {
    url: '/about',
    data: {
      authorization: false,
      redirectTo: 'about',
      memory: true
    },
    views: {
      'aboutView': {
        controller: 'AboutController',
        templateUrl: '../partials/about.html'
      }
    }
  }).state('search', {
    url: '/search',
    data: {
      authorization: false,
      redirectTo: 'search',
      memory: true
    },
    views: {
      'searchResultsView': {
        controller: 'SearchResultsController',
        templateUrl: '../partials/search-results.html'
      }
    }
  }).state('search/mysnippets', {
    url: '/search/mysnippets',
    views: {
      'searchResultsView': {
        controller: 'SearchResultsController',
        templateUrl: '../partials/search-results.html'
      }
    }
  }).state('search/authentication', {
    url: '/search/authentication',
    views: {
      'searchResultsView': {
        controller: 'SearchResultsController',
        templateUrl: '../partials/search-results.html'
      }
    }
  }).state('search/backend', {
    url: '/search/backend',
    views: {
      'searchResultsView': {
        controller: 'SearchResultsController',
        templateUrl: '../partials/search-results.html'
      }
    }
  }).state('search/build tools', {
    url: '/search/build tools',
    views: {
      'searchResultsView': {
        controller: 'SearchResultsController',
        templateUrl: '../partials/search-results.html'
      }
    }
  }).state('search/command line', {
    url: '/search/command line',
    views: {
      'searchResultsView': {
        controller: 'SearchResultsController',
        templateUrl: '../partials/search-results.html'
      }
    }
  }).state('search/database', {
    url: '/search/database',
    views: {
      'searchResultsView': {
        controller: 'SearchResultsController',
        templateUrl: '../partials/search-results.html'
      }
    }
  }).state('search/deployment', {
    url: '/search/deployment',
    views: {
      'searchResultsView': {
        controller: 'SearchResultsController',
        templateUrl: '../partials/search-results.html'
      }
    }
  })
  .state('search/frontend', {
    url: '/search/frontend',
    views: {
      'searchResultsView': {
        controller: 'SearchResultsController',
        templateUrl: '../partials/search-results.html'
      }
    }
  })
  .state('search/testing', {
    url: '/search/testing',
    views: {
      'searchResultsView': {
        controller: 'SearchResultsController',
        templateUrl: '../partials/search-results.html'
      }
    }
  }).state('search/myfavorites', {
    url: '/search/myfavorites',
    views: {
      'searchResultsView': {
        controller: 'SearchResultsController',
        templateUrl: '../partials/search-results.html'
      }
    }
  }).state('search-results', {
    url: '/search/:query',
    views: {
      'searchResultsView': {
        controller: 'SearchResultsController',
        templateUrl: '../partials/search-results.html'
      }
    }
  }).state('add', {
    url: '/add',
    authenticate: false,
    views: {
      'addSnippetView': {
        controller: 'AddSnippetController',
        templateUrl: '../partials/add-snippet.html'
      }
    }
  }).state('snippet', {
    url: '/snippets/:id',
    authenticate: false,
    views: {
      'viewSnippetView': {
        controller: 'ViewSnippetController',
        templateUrl: '../partials/view-snippet.html'
      }
    }
  }).state('profile', {
    url: '/profile',
    data: {
      authorization: true,
      redirectTo: 'home',
      memory: true
    },
    views: {
      'viewProfileView': {
        controller: 'ProfileController',
        templateUrl: '../partials/profile.html'
      }
    }
  }).state('login', {
    name: 'login',
    url: '/loginView',
    data: {
      authorization: false,
      redirectTo: 'home',
      memory: true
    },
    views: {
      'loginView': {
        controller: 'LoginController',
        templateUrl: '../partials/login.html'
      }
    }
  }).state('signup', {
    name: 'signup',
    url: '/signupView',
    data: {
      authorization: false,
      redirectTo: 'home',
      memory: true
    },
    views: {
      'signUpView': {
        controller: 'SignUpController',
        templateUrl: '../partials/signup.html'
      }
    }
  });
  $httpProvider.interceptors.push('APIInterceptor');
});
