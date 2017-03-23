var db = require('../config/db.js');

module.exports = {
  get: function(req, res) {
    db.Snippet.findAll({
      include: [{model: db.Topic}, {model: db.Tag}]
    })
      .then(function(snippets) {
        snippets = snippets.map(function(snippet) {
          // Get ALL data regarding the snippet, including join table values and columns
          var snipVals = snippet.dataValues;
          // console.log(snipVals);

          // Get only the tag id and name. We don't care about when the tags were created
          var tags = snipVals.Tags.map(function(tag) {
            return {
              id: tag.dataValues.id,
              tag: tag.dataValues.tag
            };
          });
          // console.log(tags);

          // Then we want to send back all the necessary information from the original
          // snippet object, with the addition of the Topic name and the Tags array of objects
          return {
            id: snipVals.id,
            title: snipVals.title,
            snippet: snipVals.snippet,
            'shortDescription': snipVals.shortDescription,
            explanation: snipVals.explanation,
            'createdAt': snipVals.createdAt,
            'updatedAt': snipVals.updatedAt,
            'TopicId': snipVals.TopicId,
            'LanguageId': snipVals.LanguageId,
            'Topic': snipVals.Topic.dataValues.name,
            'Tags': tags
          };
        });

        //console.log(snippets);
        res.status(200).json(snippets);
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

  getMostRecent: function(req, res) {
    db.Snippet.findAll({ limit: 10, order: '"createdAt" DESC' })
      .then(function(data) {
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

    db.Snippet.create(params)
      .then(function (data) {
        tags.forEach(function(item) {
          db.SnippetTag.create({ SnippetId: data.id, TagId: item });
        });
        res.status(201).json(data);
      });
  }
};