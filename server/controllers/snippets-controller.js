var db = require('../config/db.js');

module.exports = {
  get: function(req, res) {
    db.Snippet.findAll({
      include: [
        {model: db.Language},
        {model: db.Category},
        {model: db.Subcategory},
        {model: db.User}
      ]
    }).then(function(snippets) {
      snippets = snippets.map(function(snippet) {
        // Get ALL data regarding the snippet, including join table values and columns
        var snipVals = snippet.dataValues;
        return {
          id: snipVals.id,
          title: snipVals.title,
          snippet: snipVals.snippet,
          'notes': snipVals.notes,
          'createdAt': snipVals.createdAt,
          'updatedAt': snipVals.updatedAt,
          'LanguageId': snipVals.LanguageId,
          'Language': snipVals.Language.dataValues.displayname,
          'category': snipVals.Category.dataValues.name,
          'subcategory': snipVals.Subcategory.dataValues.name,
          'user': snipVals.User.dataValues
        };
      });
      res.status(200).json(snippets);
    });
  },

  getSnippetsByUser: function(req, res) {
    var params = {
      userId: Number(req.params.userId)
    };
    db.Snippet.findAll({
      where: {
        'UserId': Number(req.params.userId)
      },
      include: [
        {model: db.Language},
        {model: db.Category},
        {model: db.Subcategory}
      ]
    }).then(function(snippets) {
      snippets = snippets.map(function(snippet) {
        // Get ALL data regarding the snippet, including join table values and columns
        var snipVals = snippet.dataValues;
        return {
          id: snipVals.id,
          title: snipVals.title,
          snippet: snipVals.snippet,
          'notes': snipVals.notes,
          'createdAt': snipVals.createdAt,
          'updatedAt': snipVals.updatedAt,
          'LanguageId': snipVals.LanguageId,
          'Language': snipVals.Language.dataValues.displayname,
          'category': snipVals.Category.dataValues.name,
          'subcategory': snipVals.Subcategory.dataValues.name
        };
      });
      res.status(200).json(snippets);
    });
  },

  getById: function(req, res) {
    db.Snippet.findOne({
      include: [
        {model: db.Language},
        {model: db.ResourceUrl},
        {model: db.Category},
        {model: db.Subcategory},
        {model: db.User}
      ],
      where: {
        id: Number(req.params.id)
      }
    }).then(function(snippet) {
      if (snippet) {
        // NOTE: This is the exact same as 'get'
        // Only difference is that the 'where' options is added and returns 1 object
        // Make this more modular and DRY
        var snipVals = snippet.dataValues;

        res.status(200).json({
          id: snipVals.id,
          title: snipVals.title,
          snippet: snipVals.snippet,
          'notes': snipVals.notes,
          'createdAt': snipVals.createdAt,
          'updatedAt': snipVals.updatedAt,
          'LanguageId': snipVals.LanguageId,
          'Language': snipVals.Language.dataValues.displayname,
          'resources': snipVals.ResourceUrls,
          'category': snipVals.Category.dataValues.name,
          'subcategory': snipVals.Subcategory.dataValues.name,
          'user': snipVals.User.dataValues
        });
      }
    });
  },

  getMostRecent: function(req, res) {
    db.Snippet.findAll({
      include: [
        {model: db.Language},
        {model: db.Category},
        {model: db.Subcategory}
      ],
      limit: 10,
      order: '"createdAt" DESC'
    }).then(function(snippets) {
      // NOTE: This is the exact same as 'get'
      // Only difference is that the 'limit' and 'order' options are added
      // Make this more modular and DRY
      snippets = snippets.map(function(snippet) {
        var snipVals = snippet.dataValues;

        return {
          id: snipVals.id,
          title: snipVals.title,
          snippet: snipVals.snippet,
          'notes': snipVals.notes,
          'createdAt': snipVals.createdAt,
          'updatedAt': snipVals.updatedAt,
          'LanguageId': snipVals.LanguageId,
          'Language': snipVals.Language.dataValues.displayname,
          'category': snipVals.Category.dataValues.name,
          'subcategory': snipVals.Subcategory.dataValues.name,
        };
      });
      res.status(200).json(snippets);
    });
  },

  post: function(req, res) {
    var params = {
      title: req.body.title,
      snippet: req.body.snippet,
      notes: req.body.notes || '',
      LanguageId: Number(req.body.LanguageId),
      CategoryId: Number(req.body.category),
      SubcategoryId: Number(req.body.subcategory),
      // TODO: put me back in -> UserId: Number(req.body.userId)
      UserId: Number(req.body.userId)
    };

    db.Snippet.create(params)
      .then(function(data) {
        if (req.body.resources) {
          var resourceUrlData = req.body.resources.map(url => {
            return {
              "SnippetId": data.id,
              "url": url
            }
          });

          db.ResourceUrl.bulkCreate(resourceUrlData)
          .then(function(resourceUrls) {
            res.status(201).json(data);
          })
        } else {
          res.status(201).json(data);
        }
      })
  }
};
