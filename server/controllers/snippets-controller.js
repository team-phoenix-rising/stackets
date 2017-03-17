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
        //   topic_id: # --> topic table --> 'Javascript'
        //   language_id: # --> language table --> 'ES6'
        // }
      });
  },
  post: function(req, res) {
    // req.body.alltags
    // > current snippet id (findById(req.body.id))
    // > in the join table Snippet_Tags,
    // >

    /*req.body -->
      {
        title: req.body.title
        snippet: req.body.snippet,
        shortDescription: req.body.shortDescription,
        explanation: req.body.explanation,
        TopicId: #
        Tags: [#,#,#,#]
      }

      var tags = req.body.tags // depends what client calls tags array
      */

    // topic 'Javascript'
    // --> look at topic table and find name 'Javascript'
    // --> get the id of that entry
    // // --> put into param
    // db.Topic.findOne({name:req.body.topic})
    //   .then(function(data) {
    //     console.log(data.id);
    //   });


    // language ''
    // --> look at topic table and find name ''
    // --> get the id of that entry
    // --> put into param

    var params = {
      title: req.body.title,
      snippet: req.body.snippet,
      shortDescription: req.body.shortDescription,
      explanation: req.body.explanation
      // topicId
    };

    db.Snippet.create(params)
      .then(function (err, data) {
        // db.SnippetTags.findById(data.id)
        // then(function(err,data))
          // forEach tags we get from client side,
          // data.tags = req.body.tags

        res.sendStatus(201);
      });
  }
};