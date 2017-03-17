angular.module('stackets', [
  'ui.router'

  ])
  .config(function($stateProvider, $locationProvider) {
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
            searchBarView: {
              controller: '',
              templateUrl: ''
            }
            
          }
       }) 
  })
