var Sequelize = require('sequelize');
<<<<<<< b34a3790b3573d78ec31fc5157280728db30b6fa
var db = new Sequelize('stackets', process.env.POSTGRES_USER, '', {dialect: 'postgres'}); //TBD to change the args (username , password) to ENV variables.
=======
var db = new Sequelize('stackets', 'process.env.POSTGRES_USER', '', {dialect: 'postgres'}); //TBD to change the args (username , password) to ENV variables.
>>>>>>> update package.json with sequelize and clean up db.js

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

// Join Table
var SnippetTags = db.define('SnippetTags');

// Sync & Create
Snippet.sync()
.then( () => CodeSample.sync() )
.then( () => Topic.sync() )
.then( () => Language.sync() )
.then( () => Tags.sync() )
.then( () => Snippet.belongsTo(Topic) )
.then( () => Topic.hasMany(Snippet) )
.then( () => Snippet.hasMany(CodeSample) )
.then( () => CodeSample.belongsTo(Snippet) )
.then( () => Snippet.belongsTo(Language) )
.then( () => Language.hasMany(Snippet) )
.then( () => Tags.hasMany(Snippet))
.then( () => Snippet.hasMany(Tags));

module.exports = {
  Snippet: Snippet,
  CodeSample: CodeSample,
  Topic: Topic,
  Language: Language,
  Tags: Tags,
  SnippetTags: SnippetTags
<<<<<<< b34a3790b3573d78ec31fc5157280728db30b6fa
}
// Snippet_id: Sequelize.INTEGER,
//   tag_id: Sequelize.INTEGER
=======
};
>>>>>>> update package.json with sequelize and clean up db.js
