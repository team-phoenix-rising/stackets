var Sequelize = require('sequelize');
var db = new Sequelize('stackets', process.env.POSTGRES_USER, '', {dialect: 'postgres'}); //TBD to change the args (username , password) to ENV variables.

// var User = db.define('User', {
//   username: Sequelize.STRING
// });
var Snippet = db.define('Snippet', {
  //id: Sequelize.INTEGER,
  title: Sequelize.STRING,
  snippet: Sequelize.TEXT,
  shortDescription: Sequelize.STRING,
  explanation: Sequelize.TEXT
});

var CodeSample = db.define('CodeSample', {
  //id: Sequelize.INTEGER,
  codeSample: Sequelize.TEXT
});

var Topic = db.define('Topic', {
  //id: Sequelize.INTEGER,
  name: Sequelize.TEXT
});

var Language = db.define('Language', {
  //id: Sequelize.INTEGER,
  name: Sequelize.TEXT,
  version: Sequelize.TEXT
});

var Tags = db.define('Tags', {
  //id: Sequelize.INTEGER,
  tag: Sequelize.TEXT
});

var SnippetTags = db.define('SnippetTags');

Snippet.sync()
.then(() => CodeSample.sync())
.then(() => Topic.sync())
.then(() => Language.sync())
.then(() => Tags.sync())
.then(() => Snippet.belongsTo(Topic, {foreignkey: 'TopicId'}))
.then(() => Topic.hasMany(Snippet, {foreignkey: 'TopicId'}))
.then(() => Snippet.hasMany(CodeSample, {foreignkey: 'SnippetId'}))
.then(() => CodeSample.belongsTo(Snippet, {foreignkey: 'SnippetId'}))
.then(() => Snippet.belongsTo(Language, {foreignkey: 'LanguageId'}))
.then(() => Language.hasMany(Snippet, {foreignkey: 'LanguageId'}))
.then(() => Tags.belongsToMany(Snippet, {through: SnippetTags, foreignkey: 'TagsId'}))
.then(() => Snippet.belongsToMany(Tags, {through: SnippetTags, foreignkey: 'SnippetId'}));

module.exports = {
  Snippet: Snippet,
  CodeSample: CodeSample,
  Topic: Topic,
  Language: Language,
  Tags: Tags,
  SnippetTags: SnippetTags
};
