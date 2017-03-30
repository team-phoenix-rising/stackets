var db = require('../server/config/db.js');

//run this file node seeder.js to populate the database

//create variables for each table
var Language = db.Language;
var Snippet = db.Snippet;
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
  Language.sync({force: true})
  .then(() => Snippet.sync({force: true}))
  .then(() => ResourceUrl.sync({force: true}))
  .then(() => User.sync({force: true}))
  .then(() => Favorite.sync({force: true}))

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

};
