//require each controller, will refer to each controller in the routes
var snippetsController = require('../controllers/snippets-controller.js');
var languageController = require('../controllers/languages-controller.js');
var favoriteController = require('../controllers/favorite-controller.js');
var categoryController = require('../controllers/categories-controller.js');


module.exports = function(app, express) {
  //get all the snippets
  app.get('/api/snippets', snippetsController.get);
  //get the most recent snippets
  app.get('/api/snippets/recent', snippetsController.getMostRecent);
  //get a snippet by its id
  app.get('/api/snippets/:id', snippetsController.getById);
  //create a new snippet
  app.post('/api/snippets', snippetsController.post);
  //get all the languages
  app.get('/api/languages', languageController.get);
  //toggles the favorite status of a snippet
  app.post('/api/favorite', favoriteController.post);
  //get favorites status by snippet and user
  app.get('/api/isFavSnippetByUser/:snippetId/:userId', favoriteController.isFavSnippetByUser);
  //get total favorites per snippet
  app.get('/api/getFavsBySnippet/:snippetId', favoriteController.getFavsBySnippet);
  //get all categories
  app.get('/api/categories', categoryController.getCategories);
  //direct to about page
  app.get('/about', function(req, res) {
    res.redirect('/');
  });
  //direct to search page
  app.get('/search', function(req, res) {
    res.redirect('/');
  });
  //direct to page wher a user can add a snippet
  app.get('/add', function(req, res) {
    res.redirect('/');
  });
  //redirect to the home page
  app.get('/*', function(req, res) {
    res.redirect('/');
  });
};
