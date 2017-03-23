var Sequelize = require('sequelize');
var db = new Sequelize('stackets', process.env.POSTGRES_USER, '', {dialect: 'postgres', logging: false });

var Snippet = db.define('Snippet', {
  title: Sequelize.STRING,
  snippet: Sequelize.TEXT,
  example: Sequelize.TEXT,
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
  version: Sequelize.TEXT
});

var Tag = db.define('Tag', {
  tag: Sequelize.TEXT
});

var SnippetTag = db.define('SnippetTag');

Snippet.sync()
.then(() => Snippet.hasMany(CodeSample, {foreignkey: 'SnippetId'}))
.then(() => CodeSample.belongsTo(Snippet, {foreignkey: 'SnippetId'}))
.then(() => CodeSample.sync({force: true}))
.then(() => Snippet.belongsTo(Topic, {foreignkey: { name: 'TopicId'}}))
.then(() => Topic.hasMany(Snippet, {foreignkey: { name: 'TopicId'}}))
.then(() => Topic.sync({force: true}))
.then(() => Snippet.belongsTo(Language, {foreignkey: 'LanguageId'}))
.then(() => Language.hasMany(Snippet, {foreignkey: 'LanguageId'}))
.then(() => Language.sync({force: true}))
.then(() => Tag.belongsToMany(Snippet, {through: SnippetTag }))
.then(() => Snippet.belongsToMany(Tag, {through: SnippetTag }))
.then(() => Tag.sync({force: true}))
.then(() => Snippet.sync({force: true}))
.then(() => SnippetTag.sync({force: true}))
   // Insert default topic
.then(() => Topic.create({ name: 'Javascript' }))
.then(() => Topic.create({ name: 'React' }))
.then(() => Topic.create({ name: 'Angular' }))
.then(() => Topic.create({ name: 'Database' }))
.then(() => Topic.create({ name: 'Server' }))
  // Insert default tag
.then(() => Tag.create({ tag: 'ES5' }))
.then(() => Tag.create({ tag: 'ES6' }))
.then(() => Tag.create({ tag: 'ORM' }))
.then(() => Tag.create({ tag: 'SQL' }))
.then(() => Tag.create({ tag: 'Mongoose' }))
.then(() => Tag.create({ tag: 'Sequelize' }))
.then(() => Tag.create({ tag: 'D3' }))
.then(() => Tag.create({ tag: 'Backbone' }))
.then(() => Tag.create({ tag: 'Unicorns' }))
  // Insert dummy snippet
.then(() =>
  Snippet.create({
    title: "Dummy title 1",
    snippet: "Dummy snippet 1",
    example: "Dummy example 1",
    "shortDescription": "Dummy shortDescription 1",
    explanation: "Dummy explanation 1",
    "TopicId": 1
  }).then(function (snippet) {
    SnippetTag.create({ SnippetId: snippet.id, TagId: 2 });
    SnippetTag.create({ SnippetId: snippet.id, TagId: 5 });
  }))
.then(() =>
  Snippet.create({
    title: "Dummy title 2",
    snippet: "Dummy snippet 2",
    example: "Dummy example 1",
    "shortDescription": "Dummy shortDescription 2",
    explanation: "Dummy explanation 2",
    "TopicId": 2
  }).then(function (snippet) {
    SnippetTag.create({ SnippetId: snippet.id, TagId: 3 });
    SnippetTag.create({ SnippetId: snippet.id, TagId: 4 });
    SnippetTag.create({ SnippetId: snippet.id, TagId: 5 });
    SnippetTag.create({ SnippetId: snippet.id, TagId: 8 });
  }))
.then(() =>
  Snippet.create({
    title: "Dummy title 3",
    snippet: "Dummy snippet 3",
    example: "Dummy example 1",
    "shortDescription": "Dummy shortDescription 3",
    explanation: "Dummy explanation 32",
    "TopicId": 4
  }).then(function (snippet) {
    SnippetTag.create({ SnippetId: snippet.id, TagId: 1 });
    SnippetTag.create({ SnippetId: snippet.id, TagId: 9 });
    SnippetTag.create({ SnippetId: snippet.id, TagId: 3 });
  }));
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

module.exports = {
  Snippet: Snippet,
  CodeSample: CodeSample,
  Topic: Topic,
  Language: Language,
  Tag: Tag,
  SnippetTag: SnippetTag
};
