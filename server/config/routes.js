var snippetsController = require('../controllers/snippets-controller.js');
var languageController = require('../controllers/language-controller.js');
var topicController = require('../controllers/topics-controller.js');

module.exports = function(app, express) {
  app.get('/api/snippets', snippetsController.get);
  app.post('/api/snippets', snippetsController.post);
  app.get('/api/snippets/:id'); //add controller
  app.get('/api/language', languageController.get);
  app.get('/api/topic', topicController.get);
};