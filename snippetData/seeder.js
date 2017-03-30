var db = require('../server/config/db.js');

//run this file node seeder.js to populate the database

//create variables for each table
var Topic = db.Topic;
var Language = db.Language;
var Tag = db.Tag;
var CodeSample = db.CodeSample;
var Snippet = db.Snippet;
var SnippetTag = db.SnippetTag;
var ResourceUrl = db.ResourceUrl;
var User = db.User;
var Favorite = db.Favorite;

// Hit me with them ghetto delays to let the tables procreate - Jason Kim
//wait 2000ms for the tables above to be created
setTimeout(function() {
  seedData();
}, 2000);

//add data to database
var seedData = function() {
  // Drop it like it's hot
  console.log('Dropping and re-creating tables');
  CodeSample.sync({force: true})
  .then(() => Topic.sync({force: true}))
  .then(() => Language.sync({force: true}))
  .then(() => Tag.sync({force: true}))
  .then(() => Snippet.sync({force: true}))
  .then(() => SnippetTag.sync({force: true}))
  .then(() => ResourceUrl.sync({force: true}))
  .then(() => User.sync({force: true}))
  .then(() => Favorite.sync({force: true}))

  // Insert default topics
  .then(() => Topic.create({ name: 'Database' }))
  .then(() => Topic.create({ name: 'Deployment' }))
  .then(() => Topic.create({ name: 'Frontend/UI' }))
  .then(() => Topic.create({ name: 'Frameworks' }))
  .then(() => Topic.create({ name: 'Libraries' }))
  .then(() => Topic.create({ name: 'Server' }))

  // Insert default tags
  .then(() => Tag.create({ tag: 'Angular' }))
  .then(() => Tag.create({ tag: 'Backbone' }))
  .then(() => Tag.create({ tag: 'Command-line Interface' }))
  .then(() => Tag.create({ tag: 'D3' }))
  .then(() => Tag.create({ tag: 'Dev Environment' }))
  .then(() => Tag.create({ tag: 'Digital Ocean' }))
  .then(() => Tag.create({ tag: 'ES5' }))
  .then(() => Tag.create({ tag: 'ES6' }))
  .then(() => Tag.create({ tag: 'Express' }))
  .then(() => Tag.create({ tag: 'Git' }))
  .then(() => Tag.create({ tag: 'Grunt' }))
  .then(() => Tag.create({ tag: 'Gulp' }))
  .then(() => Tag.create({ tag: 'Handlebars' }))
  .then(() => Tag.create({ tag: 'Heroku' }))
  .then(() => Tag.create({ tag: 'lodash' }))
  .then(() => Tag.create({ tag: 'MongoDB' }))
  .then(() => Tag.create({ tag: 'Mongoose' }))
  .then(() => Tag.create({ tag: 'MVC' }))
  .then(() => Tag.create({ tag: 'ORM' }))
  .then(() => Tag.create({ tag: 'PostgreSQL' }))
  .then(() => Tag.create({ tag: 'React' }))
  .then(() => Tag.create({ tag: 'Underscore' }))
  .then(() => Tag.create({ tag: 'Scripts' }))
  .then(() => Tag.create({ tag: 'Sequelize' }))
  .then(() => Tag.create({ tag: 'SQL' }))
  .then(() => Tag.create({ tag: 'Shell' }))
  .then(() => Tag.create({ tag: 'TDD' }))
  .then(() => Tag.create({ tag: 'Testing' }))
  .then(() => Tag.create({ tag: 'Unicorns' }))

  // Insert default languages shown in dropdown
  .then(() => Language.create({ name: 'css', displayname: 'CSS' }))  //1
  .then(() => Language.create({ name: 'ejs', displayname: 'EJS' }))
  .then(() => Language.create({ name: 'html', displayname: 'HTML' }))
  .then(() => Language.create({ name: 'javascript', displayname: 'Javascript' }))
  .then(() => Language.create({ name: 'json', displayname: 'JSON' })) //5
  .then(() => Language.create({ name: 'jsx', displayname: 'JSX' }))
  .then(() => Language.create({ name: 'markdown', displayname: 'Markdown' }))
  .then(() => Language.create({ name: 'text', displayname: 'Plain Text' }))
  .then(() => Language.create({ name: 'pgsql', displayname: 'PostgreSQL' }))
  .then(() => Language.create({ name: 'python', displayname: 'Python' }))
  .then(() => Language.create({ name: 'sass', displayname: 'Sass' })) //10
  .then(() => Language.create({ name: 'scss', displayname: 'SCSS' }))
  .then(() => Language.create({ name: 'sql', displayname: 'SQL' }))
  .then(() => Language.create({ name: 'typescript', displayname: 'Typescript' }))
  .then(() => Language.create({ name: 'xml', displayname: 'XML' }))  //15

  //Create user
  .then(() => User.create({ name: 'Stackets Fanatic' }));  //15

  // Insert dummy snippets and code samples directly after each snippet
  // .then(() =>
  //   Snippet.create({
  //     title: "Welcome!",
  //     snippet: JSON.stringify("var x = \"hello\";\n\nvar print = function () {\n    console.log(x);\n};"),
  //     "shortDescription": "Dummy shortDescription 1",
  //     explanation: JSON.stringify("Sample Explanation"),
  //     "TopicId": 3,
  //     "LanguageId": 4
  //   }).then(function (snippet) {
  //     SnippetTag.create({ SnippetId: snippet.id, TagId: 7 });
  //   }))
  // .then(() =>
  //   CodeSample.create({
  //     "codeSample": JSON.stringify("Test code sample 1"),
  //     "SnippetId": 1
  //   }));
};
