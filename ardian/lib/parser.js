module.exports = exports = (req, res, next) => {
  var string = '';

  req.on('data', (data) => {
    string += data.toString();
  });

  req.on('end', () => {
    if(!string) return next();

    try {
      req.body = JSON.parse(string);
      console.log('saved');
      next();
    } catch (err) {
      console.log('err');
      return res.status(400).json({msg: 'invalid json'});
    }
  });
};
