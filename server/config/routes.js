//require each controller, will refer to each controller in the routes
require('../../env.js');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var jwt = require('jsonwebtoken');
//var jwtDoorKeeper = require('express-jwt');
var snippetsController = require('../controllers/snippets-controller.js');
var jwtAuth = require('../controllers/jwt-authenticate.js');
var userSignUpController = require('../controllers/user-signup-controller.js');
var loginController = require('../controllers/login-controller.js');
var languageController = require('../controllers/languages-controller.js');
var favoriteController = require('../controllers/favorite-controller.js');
var categoryController = require('../controllers/categories-controller.js');
var profileController = require('../controllers/profile-controller.js');


module.exports = function(app, express) {
  app.post('/signup', userSignUpController.signup);

  app.post('/login', loginController.login);

  app.post('/authenticate', jwtAuth.authenticate);

  app.get('/login/github', passport.authenticate('github'));

  app.get('/login/github/return', 
    passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {      
      console.log('github res: ', req.user.dataValues);
      var token = jwt.sign({
        name: req.user.dataValues.name,
        photo: req.user.dataValues.image                    
      }, process.env.JWT_SECRET);                  
      var userId = req.user.dataValues.id;
      var name = req.user.dataValues.name;
      var photo = req.user.dataValues.image;                  
      res.redirect('/?name='+name+'&photo='+photo+'&id='+userId+'&token='+token);            
    }
  );

  app.get('/login/facebook', passport.authenticate('facebook'));

  app.get('/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
      console.log('face res: ', req.user.dataValues);
      req.session.facebookUser = req.user.dataValues.name;
      console.log(req.session)
      var id = req.user.dataValues.id
      var name = req.user.dataValues.name
      var photo = req.user.dataValues.image
      res.redirect('/?name='+name+'&photo='+photo+'&id='+id);
    }
  );

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
  //get all the snippets
  app.get('/api/snippets', snippetsController.get);
  //get the most recent snippets
  app.get('/api/snippets/recent', snippetsController.getMostRecent);
  //get a snippet by its id
  app.get('/api/snippets/:id', snippetsController.getById);
  //get snippets by created by user
  app.get('/api/getSnippetsByUser/:userId', snippetsController.getSnippetsByUser);
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
  //get sub-categories by category id
  app.get('/api/sub-categories/:id', categoryController.getSubcategories);
  //get total favorites per snippet
  app.get('/api/getFavsByUser/:userId', favoriteController.getFavsByUser);
  //get user data
  app.get('/api/getUserData/:userId', profileController.getUserData);
  //direct to about page
  app.get('/about', function(req, res) {
    res.redirect('/');
  });
  //direct to profile page
  app.get('/profile', function(req, res) {
    console.log('profile request...', req.headers)
    res.redirect('/');
  });
  //direct to search page
  app.get('/search', function(req, res) {
    res.redirect('/');
  });
  //direct view all page
  app.get('/search/mysnippets', function(req, res) {
    res.redirect('/');
  });
  //direct to view favorites
  app.get('/search/myfavorties', function(req, res) {
    res.redirect('/');
  });
  //direct to page wher a user can add a snippet
  app.get('/add', function(req, res) {
    res.redirect('/');
  });
  //redirect to the home page
  app.get('/*', function(req, res) {    
    console.log('incoming request comming...', req.headers);
    res.redirect('/');
  });
};
