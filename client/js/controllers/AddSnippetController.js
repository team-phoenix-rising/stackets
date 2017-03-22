angular.module('stackets.addSnippet', [])
  .controller('AddSnippetController', function ($scope, Snippets) {
    $scope.addSnippetTitle = 'Add a Snippet';
    $scope.topics = {};
    $scope.tags = {};

    Snippets.getAllTopics().then(function (topics) {
      $scope.topics = topics;
      //console.log('Metadata retrieved from Snippets service: ', JSON.stringify(topics));
    });

    Snippets.getAllTags().then(function (tags) {
      $scope.tags = tags;
    });

    $scope.addSnippet = function (form) {
      // console.log('Calling the addSnippet function from the AddSnippetController...');
      // console.log('Adding: ', JSON.stringify(this.snippet));
      Snippets.addSnippet(this.snippet);
      form.$setPristine();
      form.$setUntouched();
    };
  });
