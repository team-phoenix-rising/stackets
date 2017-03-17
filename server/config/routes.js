//require controllers here

module.exports = function(app, express) {
  app.get('api/snippets'); //add controller
  app.post('api/snippets'); //add controller
  app.get('api/snippets/:id'); //add controller
  app.get('api/language'); //add controller, may potentially remove
  app.get('api/tags'); //add controller, may potentially remove
}