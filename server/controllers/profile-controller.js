var db = require('../config/db.js');

module.exports = {

  getUserData: function(req, res) {
    var params = {
      userId: req.params.userId
    };
    db.User.findOne( {
      where: {
        "id": params.userId
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

  }

};
