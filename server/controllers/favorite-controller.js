var db = require('../config/db.js');

module.exports = {

  getFavsBySnippet: function(req, res) {
    var params = {
      snippetId: Number(req.params.snippetId)
    };
    db.Favorite.count({
      where: {
        "SnippetId": params.snippetId
      }
    })
    .then(function(response) {
      res.status(200).send({count: response});
    })
    .catch(function(error) {
      console.log('Error getting favorites: ', error)
      res.status(400).send(error);
    });
  },

  isFavSnippetByUser: function(req, res) {
    var params = {
      snippetId: Number(req.params.snippetId),
      userId: Number(req.params.userId)
    };
    db.Favorite.findOne({
      where: {
        "SnippetId": params.snippetId,
        "UserId": params.userId
      }
    })
    .then(function(response) {
      res.status(200).send(response);
    })
    .catch(function(error) {
      console.log('Error checking if favorite: ', error)
      res.status(400).send(error);
    });
  },

  getFavsByUser: function(req, res) {
    var params = {
      userId: Number(req.params.userId)
    };
    db.Favorite.findAll({
      where: {
        'UserId': req.params.userId
      },
      include: [
        {
          model: db.Snippet,
          include: [
            {
              model: db.Language
            }, {
              model: db.Category
            }, {
              model: db.Subcategory
            }, {
              model: db.User
            }
          ]
        }
      ]
    })
    .then(function(response) {
      var snippets = response.map(snippet => {
        return {
          id: snippet.dataValues.Snippet.dataValues.id,
          title: snippet.dataValues.Snippet.dataValues.title,
          snippet: snippet.dataValues.Snippet.dataValues.snippet,
          'notes': snippet.dataValues.Snippet.dataValues.notes,
          'createdAt': snippet.dataValues.Snippet.dataValues.createdAt,
          'updatedAt': snippet.dataValues.Snippet.dataValues.updatedAt,
          'LanguageId': snippet.dataValues.Snippet.dataValues.LanguageId,
          'Language': snippet.dataValues.Snippet.dataValues.Language.dataValues.displayname,
          'category': snippet.dataValues.Snippet.dataValues.Category.dataValues.name,
          'subcategory': snippet.dataValues.Snippet.dataValues.Subcategory.dataValues.name,
          'user': snippet.dataValues.Snippet.dataValues.User.dataValues
        }
      });
      res.status(200).send(snippets);
    })
    .catch(function(error) {
      console.log('Error getting favorites for user: ', error)
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
      .then(function(response) {
        res.status(201).json(response);
      })
      .catch(function(error) {
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
      .then(function(response) {
        res.status(201).json(response);
      })
      .catch(function(error) {
        console.log('Error removing favorite: ', error)
        res.status(400).res(error);
      });
    }
  }
};
