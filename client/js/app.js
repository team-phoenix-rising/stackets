angular.module('stackets', [
  'stackets.searchResults',
  'stackets.services',
  'ui.router'
])
.config(function ($stateProvider, $locationProvider) {
  $locationProvider
    .html5Mode({
      enabled: true,
      requireBase: false
    });
  $stateProvider
    .state('home', {
      name: 'home',
      url: '/',
      views: {
        'homeView': {
          controller: 'HomeController',
          templateUrl: '../partials/home.html'
        },
        'searchBarView': {
          controller: 'SearchBarController',
          templateUrl: '../partials/search-bar.html'
        },
        'recentSnippetsView': {
          controller: 'RecentSnippetsController',
          templateUrl: '../partials/recent-snippets.html'
        },
        'featuredSnippetView': {
          controller: 'FeaturedSnippetController',
          templateUrl: '../partials/featured-snippet.html'
        },
        'popularSnippetsView': {
          controller: 'PopularSnippetsController',
          templateUrl: '../partials/popular-snippets.html'
        }
      }
    })
  .state('search', {
    url: '/search',
    views: {
      'searchBarView': {
        controller: 'SearchBarController',
        templateUrl: '../partials/search-bar.html'
      },
      'searchResultsView': {
        controller: 'SearchResultsController',
        templateUrl: '../partials/search-results.html'
      }
    }
  });
});
