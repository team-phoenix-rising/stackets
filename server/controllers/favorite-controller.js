var db = require('../config/db.js');

module.exports = {

  getFavsBySnippet: function(req, res) {
    var params = {
      snippetId: Number(req.params.snippetId)
    };
    db.Favorite.count( {
      where: {
        "SnippetId": params.snippetId
        }
      }
    )
    .then(function(response){
      res.status(200).send({count: response});
    })
    .catch(function(error){
      console.log('Error updating favorite: ', error)
      res.status(400).send(error);
    });

  },

  isFavSnippetByUser: function(req, res) {
    var params = {
      snippetId: Number(req.params.snippetId),
      userId: Number(req.params.userId),
    };
    db.Favorite.findOne( {
      where: {
        "SnippetId": params.snippetId,
        "UserId": params.userId
        }
      }
    )
    .then(function(response){
      res.status(200).send(response);
    })
    .catch(function(error){
      console.log('Error updating favorite: ', error)
      res.status(400).send(error);
    });

  },

  getFavsByUser: function(req, res) {
    var params = {
      userId: Number(req.params.userId)
    };
    db.Favorite.findAll({where:
      {'UserId': req.params.userId},
      include: [{model: db.Snippet}]
    })
    .then(function(response){
      res.status(200).send(response);
    })
    .catch(function(error){
      console.log('Error updating favorite: ', error)
      res.status(400).send(error);
    });

  },

  post: function(req, res) {
    var params = {
      userId: req.body.userId,
      snippetId: req.body.snippetId,
      status: req.body.status
    };
    if (params.status === true) {
      db.Favorite.create({
        "UserId": params.userId,
        "SnippetId": params.snippetId
      })
      // db.User.setSnippet([params.snippetId])
      .then(function(response){
        res.status(201).json(response);
      })
      .catch(function(error){
        console.log('Error updating favorite: ', error)
        res.status(400).res(error);
      });
    } else {
      db.Favorite.destroy({
        where: {
          "UserId": params.userId,
          "SnippetId": params.snippetId
        }
      })
      .then(function(response){
        res.status(201).json(response);
      })
      .catch(function(error){
        console.log('Error updating favorite: ', error)
        res.status(400).res(error);
      });
    }

  }
};
