angular.module('stackets.view', [])
  .controller('ViewSnippetController', function ($scope, Snippets, $stateParams) {
    console.log('Viewing Snippet No. ', $stateParams.id);
    $scope.snippet = {};
    $scope.code = '';
    Snippets.getSnippetById($stateParams.id).then(function (snippet) {
      $scope.snippet = snippet;
      $scope.code = JSON.parse(snippet.snippet);
      
      //console.log('Metadata retrieved from Snippets service: ', JSON.stringify(topics));
    });

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
      _editor.setReadOnly(true);
      _session.setUseWrapMode(true);
      // Theme @ https://github.com/ajaxorg/ace/tree/master/lib/ace/theme
      _editor.setTheme("ace/theme/monokai");
      // Mode @ https://github.com/ajaxorg/ace/tree/master/lib/ace/mode
      _session.setMode("ace/mode/javascript");
      // Load the snippet's code
      _session.setValue('');
      _session.setNewLineMode("unix");
      JSON.stringify(_session.doc.getNewLineCharacter())
      // Events
      _session.on("change", function(e) {
        $scope.code = _session.getValue();
      });
    };  
  });
