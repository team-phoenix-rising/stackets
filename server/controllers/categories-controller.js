var db = require('../config/db.js');

module.exports = {

  getCategories: function(req, res) {
    db.Category.findAll({
      attributes: ['id', 'name']
    })
      .then(function(categories) {
        res.status(200).json(categories);
      });
  },

  getSubCategories: function(req, res) {
    db.SubCategory.findAll({
      where: {CategoryId: Number(req.params.id)},
      attributes: ['id', 'name', 'CategoryId']
    })
    .then(function(subCategories) {
      res.status(200).json(subCategories);
    })
  }

}
