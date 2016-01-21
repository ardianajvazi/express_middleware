const expect = require('chai').expect;
const parser = require(__dirname + '/../lib/parser');
const fs = require('fs');

describe('json parser', () => {
  it('should parse some json', (done) => {
    var req = fs.createReadStream(__dirname + '/test.json');
    parser(req, null, function() {
      expect(req.body.test).to.eql('this is a test');
      done();
    });
  });

  it('should not parse invalid json', (done) => {
    var req = fs.createReadStream(__dirname + '/test.json');
    var res = {
      status: function(statusCode) {
        expect(statusCode).to.eql(400);
        return {
          json: function(obj) {
            expect(obj.msg).to.eql('invalid json');
            done();
          }
        };
      }
    };
    parser(req,res, function() {
      throw new Error('called next on invalid json');
    });
  });
});
