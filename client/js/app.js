angular.module('stackets', [
  'stackets.services',
  'stackets.searchBar',
  'stackets.searchResults',
  'stackets.home',
  'stackets.about',
  'stackets.view',
  'stackets.popularSnippets',
  'stackets.recentSnippets',
  'stackets.addSnippet',
  'stackets.featuredSnippet',
  'ui.router',
  'ui.ace'
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
        'recentSnippetsView': {
          controller: 'RecentSnippetsController',
          templateUrl: '../partials/recent-snippets.html'
        },
        'featuredSnippetView': {
          controller: 'FeaturedSnippetController',
          templateUrl: '../partials/featured-snippet.html'
        },
        'searchBarView': {
          controller: 'SearchBarController',
          templateUrl: '../partials/search-bar.html'
        }
      }
    })
    .state('about', {
      url: '/about',
      views: {
        'aboutView': {
          controller: 'AboutController',
          templateUrl: '../partials/about.html'
        }
      }
    })
    .state('search', {
      url: '/search',
      views: {
        'searchResultsView': {
          controller: 'SearchResultsController',
          templateUrl: '../partials/search-results.html'
        }
      }
    })
    .state('add', {
      url: '/add',
      views: {
        'addSnippetView': {
          controller: 'AddSnippetController',
          templateUrl: '../partials/add-snippet.html'
        }
      }
    })
    .state('snippet', {
      url: '/snippets/:id',
      views: {
        'viewSnippetView': {
          controller: 'ViewSnippetController',
          templateUrl: '../partials/view-snippet.html'
        }
      }
    });
});
