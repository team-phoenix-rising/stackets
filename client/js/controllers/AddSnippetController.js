angular.module('stackets.addSnippet', [])
  .controller('AddSnippetController', function ($scope, Snippets) {
    $scope.addSnippetTitle = 'Add a Snippet';
    $scope.topics = {};
    Snippets.getAllTopics().then(function (topics) {
      $scope.topics = topics;
      console.log('Metadata retrieved from Snippets service: ', JSON.stringify(topics));
    });

    $scope.addSnippet = function (form) {
      console.log('Calling the addSnippet function from the AddSnippetController...');
      console.log('Adding: ', JSON.stringify(this.snippet));
      Snippets.addSnippet(this.snippet);
      form.$setPristine();
      form.$setUntouched();
    };
  });
