var chai = require('chai');
var api = require('../../api');
var chaiHttp = require('chai-http');
var should = chai.should();
// http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai
// https://labs.chie.do/testing-a-node-js-rest-api-with-mocha-and-chai/

chai.use(chaiHttp);


describe('Todos', function() {
  it('should list ALL todos on /todo GET', function(done) {
    chai.request(api)
      .get('/todo')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.data.should.have.length(5);
        done();
    });
  });
  it('should list a SINGLE todo on /todo/<id> GET', function(done) {
    chai.request(api)
      .get('/todo/1')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.data.should.have.property('id');
        res.body.data.id.should.be.a('number');
        res.body.data.should.have.property('todo');
        res.body.data.todo.should.be.a('string');
        res.body.data.should.have.property('done');
        res.body.data.done.should.be.a('boolean');
        done();
    });
  });
  it('should add a SINGLE todo on /todo POST', function(done) {
    chai.request(api)
      .post('/todo')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({todo: 'test todo'})
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.data.should.have.property('id');
        res.body.data.id.should.be.a('number');
        res.body.data.id.should.equal(6);
        res.body.data.should.have.property('todo');
        res.body.data.todo.should.be.a('string');
        res.body.data.todo.should.equal('test todo');
        res.body.data.should.have.property('done');
        res.body.data.done.should.be.a('boolean');
        res.body.data.done.should.equal(false);
        done();
    });
  });
  it('should update a SINGLE todo on /todo/<id> PUT', function(done) {
    chai.request(api)
      .post('/todo/6')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({todo: 'test todo updated'})
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.data.should.have.property('id');
        res.body.data.id.should.be.a('number');
        res.body.data.id.should.equal(6);
        res.body.data.should.have.property('todo');
        res.body.data.todo.should.be.a('string');
        res.body.data.todo.should.equal('test todo updated');
        res.body.data.should.have.property('done');
        res.body.data.done.should.be.a('boolean');
        done();
    });
  });
  it('should delete a SINGLE todo on /todo/<id> DELETE', function(done) {
    chai.request(api)
      .delete('/todo/6')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.data.should.be.a('number');
        res.body.data.should.equal(5);
        done();
    });
  });
});
