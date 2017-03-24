var db = require('../server/config/db.js');

var Topic = db.Topic;
var Language = db.Language;
var Tag = db.Tag;
var CodeSample = db.CodeSample;
var Snippet = db.Snippet;
var SnippetTag = db.SnippetTag;

// Hit me with them ghetto delays to let the tables procreate
setTimeout(function() {
  seedData();
}, 2000);

var seedData = function() {
  // Drop it like it's hot
  console.log('Dropping and re-creating tables');
  CodeSample.sync({force: true})
  .then(() => Topic.sync({force: true}))
  .then(() => Language.sync({force: true}))
  .then(() => Tag.sync({force: true}))
  .then(() => Snippet.sync({force: true}))
  .then(() => SnippetTag.sync({force: true}))

  // Insert default topics
  .then(() => Topic.create({ name: 'Javascript' }))
  .then(() => Topic.create({ name: 'React' }))
  .then(() => Topic.create({ name: 'Angular' }))
  .then(() => Topic.create({ name: 'Database' }))
  .then(() => Topic.create({ name: 'Server' }))

  // Insert default tags
  .then(() => Tag.create({ tag: 'ES5' }))
  .then(() => Tag.create({ tag: 'ES6' }))
  .then(() => Tag.create({ tag: 'ORM' }))
  .then(() => Tag.create({ tag: 'SQL' }))
  .then(() => Tag.create({ tag: 'Mongoose' }))
  .then(() => Tag.create({ tag: 'Sequelize' }))
  .then(() => Tag.create({ tag: 'D3' }))
  .then(() => Tag.create({ tag: 'Backbone' }))
  .then(() => Tag.create({ tag: 'Unicorns' }))

  // Insert default languages
  .then(() => Language.create({ name: 'css', version: '' }))  //1
  .then(() => Language.create({ name: 'ejs', version: '' }))
  .then(() => Language.create({ name: 'html', version: '' }))
  .then(() => Language.create({ name: 'javascript', version: '' }))
  .then(() => Language.create({ name: 'json', version: '' })) //5
  .then(() => Language.create({ name: 'jsx', version: '' }))
  .then(() => Language.create({ name: 'markdown', version: '' }))
  .then(() => Language.create({ name: 'pgsql', version: '' }))
  .then(() => Language.create({ name: 'python', version: '' }))
  .then(() => Language.create({ name: 'sass', version: '' })) //10
  .then(() => Language.create({ name: 'scss', version: '' }))
  .then(() => Language.create({ name: 'sql', version: '' }))
  .then(() => Language.create({ name: 'text', version: '' }))
  .then(() => Language.create({ name: 'typescript', version: '' }))
  .then(() => Language.create({ name: 'xml', version: '' }))  //15

  // Insert dummy snippets
  .then(() =>
    Snippet.create({
      title: "Dummy title 1",
      snippet: JSON.stringify("var x = \"hello\";\n\nvar print = function () {\n    console.log(x);\n};"),
      "shortDescription": "Dummy shortDescription 1",
      explanation: "Dummy explanation 1",
      "TopicId": 1,
      "LanguageId": 4
    }).then(function (snippet) {
      SnippetTag.create({ SnippetId: snippet.id, TagId: 2 });
      SnippetTag.create({ SnippetId: snippet.id, TagId: 5 });
    }))
  .then(() =>
    Snippet.create({
      title: "Dummy title 2",
      snippet: JSON.stringify("Dummy snippet 2"),
      "shortDescription": "Dummy shortDescription 2",
      explanation: "Dummy explanation 2",
      "TopicId": 2,
      "LanguageId": 8
    }).then(function (snippet) {
      SnippetTag.create({ SnippetId: snippet.id, TagId: 3 });
      SnippetTag.create({ SnippetId: snippet.id, TagId: 4 });
      SnippetTag.create({ SnippetId: snippet.id, TagId: 5 });
      SnippetTag.create({ SnippetId: snippet.id, TagId: 8 });
    }))
  .then(() =>
    Snippet.create({
      title: "Dummy title 3",
      snippet: JSON.stringify("Dummy snippet 3"),
      "shortDescription": "Dummy shortDescription 3",
      explanation: "Dummy explanation 3",
      "TopicId": 4,
      "LanguageId": 11
    }).then(function (snippet) {
      SnippetTag.create({ SnippetId: snippet.id, TagId: 1 });
      SnippetTag.create({ SnippetId: snippet.id, TagId: 9 });
      SnippetTag.create({ SnippetId: snippet.id, TagId: 3 });
    }))
  .then(() =>
    Snippet.create({
      title: "Dummy title 4",
      snippet: JSON.stringify("Dummy snippet 4"),
      "shortDescription": "Dummy shortDescription 4",
      explanation: "Dummy explanation 4",
      "TopicId": 3,
      "LanguageId": 14
    }).then(function (snippet) {
      SnippetTag.create({ SnippetId: snippet.id, TagId: 2 });
      SnippetTag.create({ SnippetId: snippet.id, TagId: 6 });
      SnippetTag.create({ SnippetId: snippet.id, TagId: 9 });
    }))

  // Insert code samples
  // At the moment, we couldn't figure out how to implement this
  // many-to-one relation with multiple CodeSamples to each snippet
  // in our snippes-controller.js with the "include" join method
  // For now, each snippet will have one example directly input into
  // the snippet entries above
  .then(() =>
    CodeSample.create({
      "codeSample": "Test code sample 1",
      "SnippetId": 1
    }))
  .then(() =>
    CodeSample.create({
      "codeSample": "Test code sample 2",
      "SnippetId": 1
    }))
  .then(() =>
    CodeSample.create({
      "codeSample": "Test code sample 3",
      "SnippetId": 2
    }))
  .then(() =>
    CodeSample.create({
      "codeSample": "Test code sample 4",
      "SnippetId": 3
    }))
  .then(() =>
    CodeSample.create({
      "codeSample": "Test code sample 5",
      "SnippetId": 3
    }))
  .then(() =>
    CodeSample.create({
      "codeSample": "Test code sample 5",
      "SnippetId": 4
    }));
};


  // Insert dummy Snippet to Tag relations for join table
// .then(() => SnippetTag.create({ SnippetId: 1, TagId: 2}))
// .then(() => SnippetTag.create({ SnippetId: 1, TagId: 5}))
// .then(() => SnippetTag.create({ SnippetId: 2, TagId: 3}))
// .then(() => SnippetTag.create({ SnippetId: 2, TagId: 4}))
// .then(() => SnippetTag.create({ SnippetId: 2, TagId: 5}))
// .then(() => SnippetTag.create({ SnippetId: 2, TagId: 8}))
// .then(() => SnippetTag.create({ SnippetId: 3, TagId: 1}))
// .then(() => SnippetTag.create({ SnippetId: 3, TagId: 9}))
// .then(() => SnippetTag.create({ SnippetId: 3, TagId: 3}));