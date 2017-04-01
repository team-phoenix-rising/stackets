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
    .state('search-results', {
      url: '/search/:query',
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
    })
    .state('profile', {
      url: '/profile',
      views: {
        'viewProfileView': {
          controller: 'ProfileController',
          templateUrl: '../partials/profile.html'
        }
      }
    });
}).controller('loginController', function ($scope, $http, $location, Snippets) {
    var query = $location.search()
    var photo = query["photo"];
    var imageKey = query["oe"];
    $scope.photo = photo;
    $scope.username = query["name"];
    $scope.imageUrl = photo + '&oe=' + imageKey;
    $scope.show = true;
    $scope.toggleShow = function() {
      $scope.show = $scope.show ? false : true;
    }

    $scope.loginUser = function(email, password) {
    $http({
          method: 'POST',
          url: '/login',
          data: {email: email, password: password}
    }).then(function(response){
      console.log(response)

      $scope.loggedUserEmail = response.data.userEmail;
      console.log('USER DATA', response.data);
    }, function(err){
      console.log(err)
    });
    }
  });;
