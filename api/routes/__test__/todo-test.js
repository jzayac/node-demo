var expect = require('chai').expect;
var todo = require('../todo');
// https://labs.chie.do/testing-a-node-js-rest-api-with-mocha-and-chai/

describe('todo routes', function() {
  it('check size of todo array', function() {
    expect(todos.length).to.equal(5);
  });
});
