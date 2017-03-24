angular.module('stackets.addSnippet', ['ui.ace'])
  .controller('AddSnippetController', function ($scope, $location, Snippets) {
    $scope.addSnippetTitle = 'Add a Snippet';
    $scope.topics = {};
    $scope.tags = {};
    $scope.languages = {};
    $scope.code = '';

    Snippets.getAllTopics().then(function (topics) {
      $scope.topics = topics;
      //console.log('Metadata retrieved from Snippets service: ', JSON.stringify(topics));
    });

    Snippets.getAllTags().then(function (tags) {
      $scope.tags = tags;
    });

    Snippets.getAllLanguages().then(function (languages) {
      $scope.languages = languages;
    });

    $scope.addSnippet = function (form) {
      // console.log('Calling the addSnippet function from the AddSnippetController...');
      // console.log('Adding: ', JSON.stringify(this.snippet));
      this.snippet.snippet = JSON.stringify($scope.code);
      Snippets.addSnippet(this.snippet).then(function(data) {
        $location.path('/snippets/' + data.data.id);
      });
      form.$setPristine();
      form.$setUntouched();
    };

    $scope.setAceEditorLang = function (form, _editor) {
      var languageId = this.snippet.LanguageId;
      var language = _.find($scope.languages, {id: languageId});

      console.log('Language ID: ', languageId);
      console.log('Language: ', language);
      // var _session = _editor.getSession();
      // _session.setMode('ace/mode/' + language);
    }

    $scope.aceLoaded = function (_editor) {
      // Ace @ https://ace.c9.io/
    // Ace @ https://github.com/ajaxorg/ace
    // ui-ace @ https://www.npmjs.com/package/angular-ui-ace
    // CDN @ https://cdnjs.com/libraries/ace/
    // Editor font size
      document.getElementById('editor').style.fontSize='12px';
      // Options
      var _session = _editor.getSession();
      var _renderer = _editor.renderer;
      _editor.setHighlightActiveLine(true);
      _editor.setShowPrintMargin(true);
      _editor.setReadOnly(false);
      _session.setUseWrapMode(true);
      // Theme @ https://github.com/ajaxorg/ace/tree/master/lib/ace/theme
      _editor.setTheme("ace/theme/monokai");
      // Mode @ https://github.com/ajaxorg/ace/tree/master/lib/ace/mode
      _session.setMode("ace/mode/javascript");
      // Load the snippet's code
      _session.setValue('');
      // Events
      _session.on("change", function(e) {
        $scope.code = _session.getValue();
      });
    };
  });
