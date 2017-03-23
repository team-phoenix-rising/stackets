var Sequelize = require('sequelize');
var db = new Sequelize('stackets', process.env.POSTGRES_USER, '', {dialect: 'postgres', logging: false });

var Snippets = db.define('Snippets', {
  title: Sequelize.STRING,
  snippet: Sequelize.TEXT,
  example: Sequelize.TEXT,
  shortDescription: Sequelize.STRING,
  explanation: Sequelize.TEXT
});

var CodeSamples = db.define('CodeSamples', {
  codeSample: Sequelize.TEXT
});

var Topics = db.define('Topics', {
  name: Sequelize.TEXT
});

var Languages = db.define('Languages', {
  name: Sequelize.TEXT,
  version: Sequelize.TEXT
});

var Tags = db.define('Tags', {
  tag: Sequelize.TEXT
});

var SnippetTags = db.define('SnippetTags');

Snippets.sync()
.then(() => Snippets.hasMany(CodeSamples, {foreignkey: 'SnippetId'}))
.then(() => CodeSamples.belongsTo(Snippets, {foreignkey: 'SnippetId'}))
.then(() => CodeSamples.sync({force: true}))
.then(() => Snippets.belongsTo(Topics, {foreignkey: { name: 'TopicId'}}))
.then(() => Topics.hasMany(Snippets, {foreignkey: { name: 'TopicId'}}))
.then(() => Topics.sync({force: true}))
.then(() => Snippets.belongsTo(Languages, {foreignkey: 'LanguageId'}))
.then(() => Languages.hasMany(Snippets, {foreignkey: 'LanguageId'}))
.then(() => Languages.sync({force: true}))
.then(() => Tags.belongsToMany(Snippets, {through: SnippetTags, foreignkey: 'TagId'}))
.then(() => Snippets.belongsToMany(Tags, {through: SnippetTags, foreignkey: 'SnippetId'}))
.then(() => Tags.sync({force: true}))
.then(() => Snippets.sync({force: true}))
.then(() => SnippetTags.sync({force: true}))
   // Insert default topics
.then(() => Topics.create({ name: 'Javascript' }))
.then(() => Topics.create({ name: 'React' }))
.then(() => Topics.create({ name: 'Angular' }))
.then(() => Topics.create({ name: 'Database' }))
.then(() => Topics.create({ name: 'Server' }))
  // Insert default tags
.then(() => Tags.create({ tag: 'ES5' }))
.then(() => Tags.create({ tag: 'ES6' }))
.then(() => Tags.create({ tag: 'ORM' }))
.then(() => Tags.create({ tag: 'SQL' }))
.then(() => Tags.create({ tag: 'Mongoose' }))
.then(() => Tags.create({ tag: 'Sequelize' }))
.then(() => Tags.create({ tag: 'D3' }))
.then(() => Tags.create({ tag: 'Backbone' }))
.then(() => Tags.create({ tag: 'Unicorns' }))
  // Insert dummy snippets
.then(() => {
  Snippets.create({
    title: "Dummy title 1",
    snippet: "Dummy snippet 1",
    example: "Dummy example 1",
    "shortDescription": "Dummy shortDescription 1",
    explanation: "Dummy explanation 1",
    "TopicId": 1
  }) })
.then(() => {
  Snippets.create({
    title: "Dummy title 2",
    snippet: "Dummy snippet 2",
    example: "Dummy example 1",
    "shortDescription": "Dummy shortDescription 2",
    explanation: "Dummy explanation 2",
    "TopicId": 2
  }) })
.then(() => {
  Snippets.create({
    title: "Dummy title 3",
    snippet: "Dummy snippet 3",
    example: "Dummy example 1",
    "shortDescription": "Dummy shortDescription 3",
    explanation: "Dummy explanation 32",
    "TopicId": 4
  }) })
  // Insert dummy Snippet to Tag relations for join table
.then(() => SnippetTags.create({ SnippetId: 1, TagId: 2}))
.then(() => SnippetTags.create({ SnippetId: 1, TagId: 5}))
.then(() => SnippetTags.create({ SnippetId: 2, TagId: 3}))
.then(() => SnippetTags.create({ SnippetId: 2, TagId: 4}))
.then(() => SnippetTags.create({ SnippetId: 2, TagId: 5}))
.then(() => SnippetTags.create({ SnippetId: 2, TagId: 8}))
.then(() => SnippetTags.create({ SnippetId: 3, TagId: 1}))
.then(() => SnippetTags.create({ SnippetId: 3, TagId: 9}))
.then(() => SnippetTags.create({ SnippetId: 3, TagId: 3}));

module.exports = {
  Snippets: Snippets,
  CodeSamples: CodeSamples,
  Topics: Topics,
  Languages: Languages,
  Tags: Tags,
  SnippetTags: SnippetTags
};
