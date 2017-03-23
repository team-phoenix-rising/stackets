var db = require('../config/db.js');

module.exports = {
  get: function(req, res) {
    db.Snippets.findAll({})
      .then(function(data) {
        // console.log('inside findAll', data);
        res.status(200).json(data);
      });
  },
  post: function(req, res) {
    var params = {
      title: req.body.title,
      snippet: req.body.snippet,
      example: req.body.example,
      shortDescription: req.body.shortDescription,
      explanation: req.body.explanation,
      TopicId: Number(req.body.TopicId),  // topicId comes as a string from front-end form
    };

    // tags: { '1': true, '3': true, 9': true }
    // We only want the keys, and in number format
    var tags = Object.keys(req.body.tags).map(Number);

    db.Snippets.create(params)
      .then(function (data) {
        tags.forEach(function(item) {
          db.SnippetTags.create({ SnippetId: data.id, TagId: item });
        });
        res.status(201).json(data);
      });
  }
};