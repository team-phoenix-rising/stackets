var db = require('../config/db.js');
var bcrypt = require('bcrypt-nodejs');

module.exports = {
	login: function(req, res) {
	  console.log('login req..', req.body)
		db.User.findAll({
		  where: {
		    email: req.body.email
		  }
		}).then(function(user) {	  	
	  	if( user.length === 0 ) {
	  		res.status(404);
	  		res.send(); 
	  	} else {
	  		var userPassword = user[0].dataValues.password;
	  		var userEmail = user[0].dataValues.email;

	  		bcrypt.compare(req.body.password, userPassword, function(err, result) {
				  if(err) {
				  	console.log(err); 
				  }
					
					if ( result ) {
						console.log('authenticated')
						res.status(200);
						res.send({userEmail: userEmail});
					}
				});
	  	}
	  }, function(error) {
	  	console.log(error);
	  });	  
	}
}