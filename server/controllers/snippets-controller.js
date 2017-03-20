var db = require('../config/db.js');

module.exports = {
  get: function(req, res) {
    db.Snippets.findAll({})
      .then(function(data) {
        console.log('inside findAll', data);
        res.status(200).json(data);
      });
  },
  post: function(req, res) {
    var params = {
      title: req.body.title,
      snippet: req.body.snippet,
      shortDescription: req.body.shortDescription,
      explanation: req.body.explanation,
      TopicId: req.body.TopicId,
    };

    db.Snippets.create(params)
      .then(function (data) {
        console.log(data.id);
        var parsedTags = JSON.parse(req.body.Tags);
        parsedTags.forEach(function(item) {
          db.SnippetTags.create({ SnippetId: data.id, TagId: item });
        });
        res.status(201).json(data);
      });
  }
};