var db = require('../config/db.js');

module.exports = {
  get: function(req, res) {
    db.Snippet.findAll({})
      .then(function(data) {
        var totalEntries = data.length;
        var counter = 0;
        data.forEach(function(snipObj) {
          var snipObjTopicId = snipObj['dataValues']['TopicId'];
          db.Topic.findOne({ where: { id: snipObjTopicId } })
          .then(function(topicObj) {
            snipObj['dataValues']['TopicName'] = topicObj.name;
            counter++;
            if (counter === totalEntries) {
              res.status(200).json(data);
            }
          });
        });
      });
  },

  getById: function(req, res) {
    db.Snippet.findOne({ where: { id: Number(req.params.id)}})
      .then(function(snippet) {
        db.Topic.findOne({ where: { id: snippet.dataValues.TopicId }})
          .then(function(topic) {
            snippet.dataValues.TopicName = topic.name;
            res.status(200).json(snippet);
          });
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

    db.Snippet.create(params)
      .then(function (data) {
        tags.forEach(function(item) {
          db.SnippetTag.create({ SnippetId: data.id, TagId: item });
        });
        res.status(201).json(data);
      });
  }
};