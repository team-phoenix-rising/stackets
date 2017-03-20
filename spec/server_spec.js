var request = require('request');
var server = require('../server/server.js');
var baseUrl = 'http://localhost:3000';

describe('Route Tests', function() {
  // Test /api/snippets route
  describe('GET /api/snippets', function() {
    it('returns status code 200', function(done) {
      request.get(baseUrl + '/api/snippets', function(err, res, body) {
        console.log('requesting from', baseUrl + '/api/snippets');
        expect(res.statusCode).toBe(200);
        server.closeServer();
        done();
      });
    });


    // Other tests for this

  });

        //needs to be in the last "it" test statement before "done()"
        //server.closeServer();
});