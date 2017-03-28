var db = require('../config/db.js');

//this controller accesses the language table

module.exports = {
  //get all the entries from the Language table
    //column names:
      //id (auto-generated)
      //name
      //displayName
      //createdAt (auto-generated)
      //updatedAt (auto-generated)
  get: function(req, res) {
    db.Language.findAll({})
      .then(function(data) {
        // console.log('inside findAll', data);
        res.status(200).json(data);
      });
  }
};