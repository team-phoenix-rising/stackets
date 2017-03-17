var db = require('../config/db.js');

module.exports = {
  get: function(req, res) {
    //db.Topic




    // DUMMY DATA FOR FRONT END TESTING
    res.status(200).json({ id: 0, name: 'Javascript', "createdAt": "Fri Mar 17 15:08:30 PDT 2017", "updatedAt": "Fri Mar 17 15:08:30 PDT 2017" });
  }
};