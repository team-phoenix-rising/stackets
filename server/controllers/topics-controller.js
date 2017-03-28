var db = require('../config/db.js');

//this controller accesses the Topics table

module.exports = {
  //get all entries from the Topics table
    //column names
      //id (auto-generated)
      //name
      //createdAt (auto-generated)
      //updatedAt (auto-generated)
  get: function(req, res) {
    db.Topic.findAll({})
      .then(function(data) {
        // console.log('inside findAll', data);
        res.status(200).json(data);
      });
  }
};