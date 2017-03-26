angular.module('stackets.addSnippet', ['ui.ace'])
  .controller('AddSnippetController', function ($scope, $location, Snippets) {
    $scope.addSnippetTitle = 'Add a Snippet';
    $scope.topics = {};
    $scope.tags = {};
    $scope.languages = {};
    $scope.code = '';
    $scope.ace = 'javascript';

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
      this.snippet.shortDescription = JSON.stringify($scope.shortDescription);
      this.snippet.explanation = JSON.stringify($scope.explanation);
      this.snippet.snippet = JSON.stringify($scope.code);
      this.snippet.codeSample = JSON.stringify($scope.codeSample);
      console.log('Explanation:', this.snippet.explanation);
      this.snippet.explanation = JSON.stringify(this.snippet.explanation);
      console.log('Stringified Explanation:', this.snippet.explanation);
      Snippets.addSnippet(this.snippet).then(function(data) {
        $location.path('/snippets/' + data.data.id);
      });
      form.$setPristine();
      form.$setUntouched();
    };

    $scope.setAceEditorLang = function (form) {
      var languageId = Number(this.snippet.LanguageId);
      console.log('Language ID: ', languageId);
      var language;
      for (var i = 0; i < $scope.languages.length; i++) {
        if ($scope.languages[i].id === languageId) {
          language = $scope.languages[i];
          break;
        }
      }
      $scope.ace = language.name;
      $scope._editor.getSession().setMode("ace/mode/" + $scope.ace);
    };

    $scope.aceLoaded = function (_editor) {
      // Ace @ https://ace.c9.io/
    // Ace @ https://github.com/ajaxorg/ace
    // ui-ace @ https://www.npmjs.com/package/angular-ui-ace
    // CDN @ https://cdnjs.com/libraries/ace/
    // Editor font size
      $scope._editor = _editor;
      document.getElementById('editor').style.fontSize='12px';
      // Options
      var _session = _editor.getSession();
      var _renderer = _editor.renderer;
      _editor.setHighlightActiveLine(true);
      _editor.setShowPrintMargin(true);
      _editor.setReadOnly(false);
      _session.setUseWrapMode(true);
      // Theme @ https://github.com/ajaxorg/ace/tree/master/lib/ace/theme
      _editor.setTheme("ace/theme/cobalt");
      // Mode @ https://github.com/ajaxorg/ace/tree/master/lib/ace/mode
      _session.setMode("ace/mode/" + $scope.ace);
      // Load the snippet's code
      _session.setValue('');
      // Events
      _session.on("change", function(e) {
        $scope.code = _session.getValue();
      });
    };


    $scope.aceLoaded2 = function (_editor) {
      // Ace @ https://ace.c9.io/
    // Ace @ https://github.com/ajaxorg/ace
    // ui-ace @ https://www.npmjs.com/package/angular-ui-ace
    // CDN @ https://cdnjs.com/libraries/ace/
    // Editor font size
      $scope._editor = _editor;
      document.getElementById('editor').style.fontSize='12px';
      // Options
      var _session = _editor.getSession();
      var _renderer = _editor.renderer;
      _editor.setHighlightActiveLine(true);
      _editor.setShowPrintMargin(true);
      _editor.setReadOnly(false);
      _session.setUseWrapMode(true);
      // Theme @ https://github.com/ajaxorg/ace/tree/master/lib/ace/theme
      _editor.setTheme("ace/theme/cobalt");
      // Mode @ https://github.com/ajaxorg/ace/tree/master/lib/ace/mode
      _session.setMode("ace/mode/" + $scope.ace);
      // Load the snippet's code
      _session.setValue('');
      // Events
      _session.on("change", function(e) {
        $scope.codeSample = _session.getValue();
      });
    };

  });
