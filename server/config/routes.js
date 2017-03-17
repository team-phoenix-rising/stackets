var snippetsController = require('../controllers/snippets-controller.js');
var tagsController = require('../controllers/tags-controller.js');
var topicController = require('../controllers/topics-controller.js');

module.exports = function(app, express) {
  app.get('/api/snippets', snippetsController.get);
  app.post('/api/snippets', snippetsController.post);
  app.get('/api/snippets/:id'); //add controller
  app.get('/api/tags', tagsController.get);
  app.get('/api/topics', topicController.get);
};