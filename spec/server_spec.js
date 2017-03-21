var request = require('request');
var server = require('../server/server.js');
var baseUrl = 'http://localhost:3000';
var db = require('../server/config/db.js');
  // app.get('/api/snippets', snippetsController.get);
  // app.post('/api/snippets', snippetsController.post);
  // app.get('/api/snippets/:id'); //add controller
  // app.get('/api/tags', tagsController.get);
  // app.get('/api/topics', topicController.get);
  // app.get('/api/SnippetTags', snippetTagsController.get);

describe('Route Tests', function() {
  // Test /api/snippets route
  var dumbData = {
        "title": "Dummy title 2",
        "snippet": "Dummy snippet 2",
        "shortDescription": "Dummy shortDescription 2",
        "explanation": "Dummy explanation 2",
        "TopicId": 2,
        "Tags" : [1,2,3]
      };

  // beforeEach(function(done) {
  //   request(server).end(function(err, result) {
  //     db.Snippet.remove(dumbData).exec();
  //     done();
  //   })
  // });

  // describe('POST /api/snippets', function() {
  //   var options = {method: 'POST', url: baseUrl + '/api/snippets', body: dumbData, json: true, header: {"content-type" : "application/json"} }

  //   it('returns status code 201', function(done) {
  //     // request(server).post('/api/snippets').send(dumbData).expect(201).end(done);
  //     request(options, function(err, result, body) {
  //       expect(result.statusCode).toBe(201);
  //       // server.closeServer();
  //       done();
  //     })
  //   });

  //   it('returns ' + dumbData['title'], function(done) {
  //     // request(server).post('/api/snippets').send(dumbData).expect(201).end(done);
  //     request(options, function(err, result, body) {
  //       expect(result.body.title).toBe("Dummy title 2");
  //       server.closeServer();
  //       done();
  //     })
  //   });
  // });

  describe('GET /api/snippets', function() {
    it('returns status code 200', function(done) {
      request.get(baseUrl + '/api/snippets', function(err, res, body) {
        // console.log('requesting from', baseUrl + '/api/snippets');
        expect(res.statusCode).toBe(200);
        // server.closeServer();
        done();
      });
    });

    it('should get the title, snippet, shortDescription, explanation, TopicId, Tags', function(done) {
      request.get(baseUrl + '/api/snippets', function(err, res, body) {
        var parsedBody = JSON.parse(body)[0];
        console.log(parsedBody)

        server.closeServer();
        done();
      });
    });



    //make dummy data, check if got the dummy data


  });
});


  // describe('GET /api/snippets', function() {
  //   it('returns status code 200', function(done) {
  //     request.get(baseUrl + '/api/snippets', function(err, res, body) {
  //       console.log('requesting from', baseUrl + '/api/snippets');
  //       expect(res.statusCode).toBe(200);
  //       server.closeServer();
  //       done();
  //     });
  //   });

    // it('returns status code 200', function(done) {
    //   request.get(baseUrl + '/api/snippets', function(err, res, body) {
    //     console.log('requesting from', baseUrl + '/api/snippets');
    //     expect(res.statusCode).toBe(200);
    //     server.clone();oseServer();
    //     done();
    //   });
    // });



    //make dummy data, check if got the dummy data


  // });

        //needs to be in the last "it" test statement before "done()"
        //server.closeServer();
// });