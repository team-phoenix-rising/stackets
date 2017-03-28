var db = require('../config/db.js');

//this controller accesses the Tags table

module.exports = {
  //get all the entries from the Tags table
    //column names:
      //id (auto-generated)
      //tag
      //createdAt (auto-generated)
      //updatedAt (auto-generated)
  get: function(req, res) {
    db.Tag.findAll({})
      .then(function(data) {
        // console.log('inside findAll', data);
        res.status(200).json(data);
      });
  }
};