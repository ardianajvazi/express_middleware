module.exports = exports = (req, res, next) => {
  var string = '';

  req.on('data', (data) => {
    string += data.toString();
  });
  req.on('end', () => {
    try {
      req.body = JSON.parse(string);
      console.log('saved');
      next();
    } catch (err) {
      res.status(400).send({msg: 'invalid json'});
      res.end();
    }
  });
};
