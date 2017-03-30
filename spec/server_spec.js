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
    "notes": "Dummy notes 2",
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

  //////////////////////////////////////////////////////////////////////////////////////

  /*
    Always remember to close the server at the very last test case
    It needs to be in the last "it" test statement before "done()"
      server.closeServer();
    closing the server in the middle of the test suite, or leaving it
    out in general will cause issues with the tests running
  */

  /*
    TODO: test for post method
    We don't really need to clear the database or have a dummy database I believe.

    I revised the parsedBody portion of the tests to be as follows:
      var parsedBody = JSON.parse(body);
      var testEntry = parsedBody[parsedBody.length - 1];
    We are only concerned with the dummy data that we added, which should be the last
    entry in the parsedBody. We expect parsedBody to have the 3 entries created
    in our db.js file, so it will look something like [{}, {}, {}] initially

    First we'll declare the dummy entry
      {
        "title": "Test Title",
        "snippet": "Test Snippet",
        "shortDescription": "Test Description",
        "explanation": "Test Explanation",
        "TopicId": 1,
      }
    Then we'll remove the dummy entry if it exists in our database (for testing purposes)
    Something along the lines of
      Snippet.destroy({
        where: {
          // criteria goes here
          // see http://docs.sequelizejs.com/en/latest/api/model/#destroy
          // http://stackoverflow.com/questions/8402597/sequelize-js-delete-query
        }
      })
    Then we can post the dummy entry into our main database.
    Then we can do a "find" for that specific item to check if it was added to the database (something like this?)
      Snippet.find({ "title": "Test Title" })
        .then(function(data){
          // if data is null, then entry doesnt exist and it wasn't added properly?
        })
  */

  describe('GET /api/snippets', function() {
    it('returns status code 200', function(done) {
      request.get(baseUrl + '/api/snippets', function(err, res, body) {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

    it('should contain the key "title" with value of type "string"', function(done) {
      request.get(baseUrl + '/api/snippets', function(err, res, body) {
        var parsedBody = JSON.parse(body);
        var testEntry = parsedBody[parsedBody.length - 1];

        expect("title" in testEntry).toBe(true);
        expect(typeof testEntry["title"]).toBe("string");
        done();
      });
    });

    it('should contain the key "snippet" with value of type "string"', function(done) {
      request.get(baseUrl + '/api/snippets', function(err, res, body) {
        var parsedBody = JSON.parse(body);
        var testEntry = parsedBody[parsedBody.length - 1];

        expect("snippet" in testEntry).toBe(true);
        expect(typeof testEntry["snippet"]).toBe("string");
        done();
      });
    });

    it('should contain the key "notes" with value of type "string"', function(done) {
      request.get(baseUrl + '/api/snippets', function(err, res, body) {
        var parsedBody = JSON.parse(body);
        var testEntry = parsedBody[parsedBody.length - 1];

        expect("notes" in testEntry).toBe(true);
        expect(typeof testEntry["notes"]).toBe("string");
        done();
      });
    });

    it('should contain the key "TopicId" with value of type "number"', function(done) {
      request.get(baseUrl + '/api/snippets', function(err, res, body) {
        var parsedBody = JSON.parse(body);
        var testEntry = parsedBody[parsedBody.length - 1];

        expect("TopicId" in testEntry).toBe(true);
        expect(typeof testEntry["TopicId"]).toBe("number");
        done();
      });
    });
  });

  describe('GET /api/tags', function() {
    it('returns status code 200', function(done) {
      request.get(baseUrl + '/api/tags', function(err, res, body) {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

    it('should contain the key "tag" with value of type "string"', function(done) {
      request.get(baseUrl + '/api/tags', function(err, res, body) {
        var parsedBody = JSON.parse(body);
        var testEntry = parsedBody[parsedBody.length - 1];

        expect("tag" in testEntry).toBe(true);
        expect(typeof testEntry["tag"]).toBe("string");
        done();
      });
    });
  });

  describe('GET /api/topics', function() {
    it('returns status code 200', function(done) {
      request.get(baseUrl + '/api/topics', function(err, res, body) {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

    it('should contain the key "name" with value of type "string"', function(done) {
      request.get(baseUrl + '/api/topics', function(err, res, body) {
        var parsedBody = JSON.parse(body);
        var testEntry = parsedBody[parsedBody.length - 1];

        expect("name" in testEntry).toBe(true);
        expect(typeof testEntry["name"]).toBe("string");
        done();
      });
    });
  });

  describe('GET /api/SnippetTags', function() {
    it('returns status code 200', function(done) {
      request.get(baseUrl + '/api/SnippetTags', function(err, res, body) {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

    it('should contain the key "SnippetId" with value of type "number"', function(done) {
      request.get(baseUrl + '/api/SnippetTags', function(err, res, body) {
        var parsedBody = JSON.parse(body);
        var testEntry = parsedBody[parsedBody.length - 1];

        expect("SnippetId" in testEntry).toBe(true);
        expect(typeof testEntry["SnippetId"]).toBe("number");
        done();
      });
    });

    it('should contain the key "TagId" with value of type "number"', function(done) {
      request.get(baseUrl + '/api/SnippetTags', function(err, res, body) {
        var parsedBody = JSON.parse(body);
        var testEntry = parsedBody[parsedBody.length - 1];

        expect("TagId" in testEntry).toBe(true);
        expect(typeof testEntry["TagId"]).toBe("number");
        server.closeServer();
        done();
      });
    });
  });
});
