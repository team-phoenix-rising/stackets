var db = require('../config/db.js');

module.exports = {
  get: function(req, res) {
    db.Snippet.findAll({})
      .then(function(data) {
        console.log('inside findAll', data);
        res.status(200).json(data);
        // {
        //   id,
        //   title,
        //   snippet,
        //   short description,
        //   explanation,
        //   language_id: 28 --> language table --> 'javascript'
        //   topic_id: 17
        // }
      });
  },
  post: function(req, res) {
    /*req.body -->
      {
        title:
        snippet: ,
        shortDescription: ,
        explanation: ,
        topic: 'Javascript,
        language: 'some language'
      }*/

    // topic 'Javascript'
    // --> look at topic table and find name 'Javascript'
    // --> get the id of that entry
    // --> put into param

    db.Topic.findOne({name:req.body.topic})

    // same for languae

    var params = {
      title: req.body.title,
      snippet: req.body.snippet,
      shortDescription: req.body.shortDescription,
      explanation: req.body.explanation
      // topicId
      // languageId
    };

    db.Snippet.create(params)
      .then(function (err, data) {
        res.sendStatus(201);
      });
  }
};