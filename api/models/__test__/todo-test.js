var expect = require('chai').expect;
var Todo = require('../todo');
// https://labs.chie.do/testing-a-node-js-rest-api-with-mocha-and-chai/

describe('todo model', function() {
  var todos = [];
  beforeEach(function (done) {
    Todo.find({}, function(err,el) {
      if (!err) {
        todos = el;
        done();
      }
    })
  });
  it('check size of todo array', function() {
    expect(todos.length).to.equal(5);
  });
});
