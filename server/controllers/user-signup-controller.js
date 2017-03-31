var db = require('../config/db.js');
var bcrypt = require('bcrypt-nodejs');

module.exports = {
	signup: function(req, res) {
    bcrypt.hash(req.body.user.password, null, null, function(err, hash) {    	
	    db.User.create({
	    	email: req.body.user.email,
	      password: hash      
	    }).then(function(user, err) {      	    	
	      console.log('successfully created ', user.dataValues.email)
	    })            	
		});
  }	
}

