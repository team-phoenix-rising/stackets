require('../../env.js')
var jwt = require('jsonwebtoken');

module.exports = {
	authenticate: function(req, res) {
		console.log('token', req.body)
		jwt.verify(req.body.webToken, process.env.JWT_SECRET, function(err, decoded) {
		  	console.log('decoded', decoded)
		  	if ( decoded ) {
		  		res.status(200)
		  		res.send(true)
		  	}	
		});
	}
}