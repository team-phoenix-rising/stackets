var Sequelize = require('sequelize');
if (process.env.DATABASE_URL) {
  var db = new Sequelize(process.env.DATABASE_URL, {dialect: 'postgres', logging: false });
} else {
  // the application is executed on the local machine
  var db = new Sequelize('stackets', process.env.POSTGRES_USER, '', {dialect: 'postgres', logging: false });
}

var Snippet = db.define('Snippet', {
  title: Sequelize.STRING,
  snippet: Sequelize.TEXT,
  shortDescription: Sequelize.STRING,
  explanation: Sequelize.TEXT
});

var CodeSample = db.define('CodeSample', {
  codeSample: Sequelize.TEXT
});

var Topic = db.define('Topic', {
  name: Sequelize.TEXT
});

var Language = db.define('Language', {
  name: Sequelize.TEXT,
  displayname: Sequelize.TEXT
});

var Tag = db.define('Tag', {
  tag: Sequelize.TEXT
});

var SnippetTag = db.define('SnippetTag');

Snippet.sync()
.then(() => Snippet.hasMany(CodeSample, {foreignkey: 'SnippetId'}))
.then(() => CodeSample.belongsTo(Snippet, {foreignkey: 'SnippetId'}))
.then(() => CodeSample.sync())
.then(() => Snippet.belongsTo(Topic, {foreignkey: { name: 'TopicId'}}))
.then(() => Topic.hasMany(Snippet, {foreignkey: { name: 'TopicId'}}))
.then(() => Topic.sync())
.then(() => Snippet.belongsTo(Language, {foreignkey: 'LanguageId'}))
.then(() => Language.hasMany(Snippet, {foreignkey: 'LanguageId'}))
.then(() => Language.sync())
.then(() => Tag.belongsToMany(Snippet, {through: SnippetTag }))
.then(() => Snippet.belongsToMany(Tag, {through: SnippetTag }))
.then(() => Tag.sync())
.then(() => Snippet.sync())
.then(() => SnippetTag.sync());

module.exports = {
  Snippet: Snippet,
  CodeSample: CodeSample,
  Topic: Topic,
  Language: Language,
  Tag: Tag,
  SnippetTag: SnippetTag
};
