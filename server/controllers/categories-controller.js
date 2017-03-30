var db = require('../config/db.js');

module.exports = {

  getCategories: function(req, res) {
    db.Category.findAll({
      attributes: ['id', 'name']
    })
      .then(function(categories) {
        res.status(200).json(categories);
      });
  }

}
