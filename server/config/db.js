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
   // Insert default topics
.then(() => { Topic.create({ name: 'Javascript' }) })
.then(() => { Topic.create({ name: 'React' }) })
.then(() => { Topic.create({ name: 'Angular' }) })
.then(() => { Topic.create({ name: 'Database' }) })
.then(() => { Topic.create({ name: 'Server' }) })
  // Insert default tags
.then(() => { Tags.create({ tag: 'ES5' }) })
.then(() => { Tags.create({ tag: 'ES6' }) })
.then(() => { Tags.create({ tag: 'ORM' }) })
.then(() => { Tags.create({ tag: 'SQL' }) })
.then(() => { Tags.create({ tag: 'Mongoose' }) })
.then(() => { Tags.create({ tag: 'Sequelize' }) })
.then(() => { Tags.create({ tag: 'D3' }) })
.then(() => { Tags.create({ tag: 'Backbone' }) })
.then(() => { Tags.create({ tag: 'Unicorns' }) })
  // Insert dummy snippets
.then(() => {
  Snippet.create({
    title: "Dummy title 1",
    snippet: "Dummy snippet 1",
    "shortDescription": "Dummy shortDescription 1",
    explanation: "Dummy explanation 1",
    "TopicId": 1
  }) })
.then(() => {
  Snippet.create({
    title: "Dummy title 2",
    snippet: "Dummy snippet 2",
    "shortDescription": "Dummy shortDescription 2",
    explanation: "Dummy explanation 2",
    "TopicId": 2
  }) })
.then(() => {
  Snippet.create({
    title: "Dummy title 3",
    snippet: "Dummy snippet 3",
    "shortDescription": "Dummy shortDescription 3",
    explanation: "Dummy explanation 32",
    "TopicId": 4
  }) })
  // Insert dummy Snippet to Tag relations for join table
.then(() => { SnippetTags.create({ SnippetId: 1, TagId: 2}) })
.then(() => { SnippetTags.create({ SnippetId: 1, TagId: 5}) })
.then(() => { SnippetTags.create({ SnippetId: 2, TagId: 3}) })
.then(() => { SnippetTags.create({ SnippetId: 2, TagId: 4}) })
.then(() => { SnippetTags.create({ SnippetId: 2, TagId: 5}) })
.then(() => { SnippetTags.create({ SnippetId: 2, TagId: 8}) })
.then(() => { SnippetTags.create({ SnippetId: 3, TagId: 1}) })
.then(() => { SnippetTags.create({ SnippetId: 3, TagId: 9}) })
.then(() => { SnippetTags.create({ SnippetId: 3, TagId: 3}) });

module.exports = {
  Snippet: Snippet,
  CodeSample: CodeSample,
  Topic: Topic,
  Language: Language,
  Tags: Tags,
  SnippetTags: SnippetTags
};
