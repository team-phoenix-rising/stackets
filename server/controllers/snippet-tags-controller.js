var db = require('../config/db.js');

//this controller accesses the Snippet - Tags join table, where snippets have many tags, tags have many snippets

module.exports = {
  //get all the entries from the SnippetTags table
    //column names:
      //SnippetId (generated thru belongsTo join statement)
      //TagId (generated thru hasMany join statement)
      //createdAt (auto-generated)
      //updatedAt (auto-generated)
  get: function(req, res) {
    db.SnippetTag.findAll({})
    .then(function(data) {
      res.status(200).json(data);
    });
  }
};