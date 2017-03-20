var db = require('../config/db.js');

module.exports = {
  get: function(req, res) {
    //get entries of snippets tags join table
    //send
    db.SnippetTags.findAll({})
    .then(function(data) {
      res.status(200).json(data);
    })
  }
}