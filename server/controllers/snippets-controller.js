var db = require('../config/db.js');

module.exports = {
  get: function(req, res) {
    db.Snippet.findAll({
      include: [
        {model: db.Topic},
        {model: db.Tag},
        {model: db.Language}
      ]
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
            'Topic': snipVals.Topic.dataValues.name,
            'LanguageId': snipVals.LanguageId,
            'Language': snipVals.Language.dataValues.displayname,
            'Tags': tags
          };
        });

        //console.log(snippets);
        res.status(200).json(snippets);
      });
  },

  getById: function(req, res) {
    // POSSIBILITY this might cause async issue, if CodeSample.findAll takes longer than db.Snippet.findOne
    // Chain CodeSample.findAll with Snippet.findOne???

    var samples;

    db.CodeSample.findAll({ where: { "SnippetId": Number(req.params.id) } })
      .then(function(codesamples) {
        // Samples will be a simple array of objects, even if only one code sample
        // This is to provide scalability for multiple code samples in one snippet in the future
        // [ "(code sample 1)", "(code sample 2)", ... ]
        samples = codesamples.map(function(sample) {
          return sample.dataValues.codeSample;
        });
      });

    db.Snippet.findOne({
      include: [
        {model: db.Topic},
        {model: db.Tag},
        {model: db.Language}
      ],
      where: { id: Number(req.params.id)}
    })
      .then(function(snippet) {
        // NOTE: This is the exact same as 'get'
        // Only difference is that the 'where' options is added and returns 1 object
        // Make this more modular and DRY
        var snipVals = snippet.dataValues;

        var tags = snipVals.Tags.map(function(tag) {
          return {
            id: tag.dataValues.id,
            tag: tag.dataValues.tag
          };
        });

        res.status(200).json({
          id: snipVals.id,
          title: snipVals.title,
          snippet: snipVals.snippet,
          "codeSample": samples,
          'shortDescription': snipVals.shortDescription,
          explanation: snipVals.explanation,
          'createdAt': snipVals.createdAt,
          'updatedAt': snipVals.updatedAt,
          'TopicId': snipVals.TopicId,
          'Topic': snipVals.Topic.dataValues.name,
          'LanguageId': snipVals.LanguageId,
          'Language': snipVals.Language.dataValues.displayname,
          'Tags': tags
        });
      });
  },

  getMostRecent: function(req, res) {
    db.Snippet.findAll({
      include: [
        {model: db.Topic},
        {model: db.Tag},
        {model: db.Language}
      ],
      limit: 10,
      order: '"createdAt" DESC'
    })
      .then(function(snippets) {
        // NOTE: This is the exact same as 'get'
        // Only difference is that the 'limit' and 'order' options are added
        // Make this more modular and DRY
        snippets = snippets.map(function(snippet) {
          var snipVals = snippet.dataValues;

          var tags = snipVals.Tags.map(function(tag) {
            return {
              id: tag.dataValues.id,
              tag: tag.dataValues.tag
            };
          });

          return {
            id: snipVals.id,
            title: snipVals.title,
            snippet: snipVals.snippet,
            'shortDescription': snipVals.shortDescription,
            explanation: snipVals.explanation,
            'createdAt': snipVals.createdAt,
            'updatedAt': snipVals.updatedAt,
            'TopicId': snipVals.TopicId,
            'Topic': snipVals.Topic.dataValues.name,
            'LanguageId': snipVals.LanguageId,
            'Language': snipVals.Language.dataValues.displayname,
            'Tags': tags
          };
        });

        res.status(200).json(snippets);
      });
  },

  post: function(req, res) {
    var params = {
      title: req.body.title,
      snippet: req.body.snippet,
      shortDescription: req.body.shortDescription,
      explanation: req.body.explanation,
      TopicId: Number(req.body.TopicId),  // topicId comes as a string from front-end form
      LanguageId: Number(req.body.TopicId),  // languageId comes as a string from front-end form
    };

    // tags: { '1': true, '3': true, 9': true }
    // We only want the keys, and in number format
    var tags = Object.keys(req.body.tags).map(Number);

    db.Snippet.create(params)
      .then(function (data) {
        tags.forEach(function(item) {
          db.SnippetTag.create({
            "SnippetId": data.id,
            "TagId": item
          });
        });

        // ALSO ADD CODE SAMPLE TO CodeSample table with new Snippet ID
        db.CodeSample.create({
          "codeSample": req.body.codeSample,
          "SnippetId": data.id
        });

        res.status(201).json(data);
      });
  }
};