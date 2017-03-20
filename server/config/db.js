var Sequelize = require('sequelize');
var db = new Sequelize('stackets', process.env.POSTGRES_USER, '', {dialect: 'postgres'});

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

Snippet.sync({force: true})
.then(() => Snippet.hasMany(CodeSample, {foreignkey: 'SnippetId'}))
.then(() => CodeSample.belongsTo(Snippet, {foreignkey: 'SnippetId'}))
.then(() => CodeSample.sync({force: true}))
.then(() => Snippet.belongsTo(Topic, {foreignkey: { name: 'TopicId'}}))
.then(() => Topic.hasMany(Snippet, {foreignkey: { name: 'TopicId'}}))
.then(() => Topic.sync({force: true}))
.then(() => Snippet.belongsTo(Language, {foreignkey: 'LanguageId'}))
.then(() => Language.hasMany(Snippet, {foreignkey: 'LanguageId'}))
.then(() => Language.sync({force: true}))
.then(() => Snippet.sync({force: true}))
.then(() => Tags.sync({force: true}))
.then(() => Tags.belongsToMany(Snippet, {through: SnippetTags, foreignkey: 'TagsId'}))
.then(() => Snippet.belongsToMany(Tags, {through: SnippetTags, foreignkey: 'SnippetId'}))
.then(() => SnippetTags.sync({force: true}))
.then(() => {
  // Insert default topics
  Topic.create({ name: 'Javascript' });
  Topic.create({ name: 'React' });
  Topic.create({ name: 'Angular' });
  Topic.create({ name: 'Database' });
  Topic.create({ name: 'Server' });

  // Insert default tags
  Tags.create({ tag: 'ES5' });
  Tags.create({ tag: 'ES6' });
  Tags.create({ tag: 'ORM' });
  Tags.create({ tag: 'SQL' });
  Tags.create({ tag: 'Mongoose' });
  Tags.create({ tag: 'Sequelize' });
  Tags.create({ tag: 'D3' });
  Tags.create({ tag: 'Backbone' });
  Tags.create({ tag: 'Unicorns' });

  // Insert dummy snippets
  Snippet.create({
    title: "Dummy title 1",
    snippet: "Dummy snippet 1",
    "shortDescription": "Dummy shortDescription 1",
    explanation: "Dummy explanation 1",
    "TopicId": 1
  });
  Snippet.create({
    title: "Dummy title 2",
    snippet: "Dummy snippet 2",
    "shortDescription": "Dummy shortDescription 2",
    explanation: "Dummy explanation 2",
    "TopicId": 2
  });
  Snippet.create({
    title: "Dummy title 3",
    snippet: "Dummy snippet 3",
    "shortDescription": "Dummy shortDescription 3",
    explanation: "Dummy explanation 32",
    "TopicId": 4
  });

  // Insert dummy Snippet to Tag relations for join table
  SnippetTags.create({ SnippetId: 1, TagId: 2});
  SnippetTags.create({ SnippetId: 1, TagId: 5});
  SnippetTags.create({ SnippetId: 2, TagId: 3});
  SnippetTags.create({ SnippetId: 2, TagId: 4});

  SnippetTags.create({ SnippetId: 2, TagId: 5});
  SnippetTags.create({ SnippetId: 2, TagId: 8});
  SnippetTags.create({ SnippetId: 3, TagId: 1});
  SnippetTags.create({ SnippetId: 3, TagId: 9});
  SnippetTags.create({ SnippetId: 3, TagId: 3});
});

module.exports = {
  Snippet: Snippet,
  CodeSample: CodeSample,
  Topic: Topic,
  Language: Language,
  Tags: Tags,
  SnippetTags: SnippetTags
};
