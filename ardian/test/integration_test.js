const chai = require('chai');
const chaiHttp = require('chai-http');
const parser = require(__dirname + '/../lib/parser');
const index = require(__dirname + '/../index');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
var origin = 'localhost:3000';
var uri = '/data';


describe('Server integration', () => {
  it('should handle valid JSON', (done) => {
    request(origin)
    .post(uri)
    .send({test: 'this is a test'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body).to.eql({test: 'this is a test'});
      done();
    });
  });

  it('should handle invalid JSON', (done) => {
    request(origin)
    .post(uri)
    .send('{"test": "this is a " "test"}')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(400);
      expect(res.body.msg).to.eql('invalid json');
      done();
    });
  });

  it('should handle a do not exist', (done) => {
    request(origin)
    .post('/doesnotexist')
    .send({test: 'this is a test'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(404);
      done();
    })
  })

});
