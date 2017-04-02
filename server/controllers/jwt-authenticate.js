require('../../env.js')
var jwt = require('jsonwebtoken');

module.exports = {
	authenticate: function(req, res) {
		console.log('authenticate request...', req.headers)
		jwt.verify(req.headers.authorization, process.env.JWT_SECRET, function(err, decoded) {		  	
		  	if(err) {console.log(err)}
		  	if ( decoded ) {		  		
		  		res.status(200)
		  		res.send(decoded)
		  	}	
		});
	}
}