const express = require('express');
const app = express();
const parser = require(__dirname + '/lib/parser');


var port = 3000;

app.get('/', (req, res) => {
  res.status(200).json({msg: 'Hello world'});
});

app.post('/data', parser, (req, res) => {
  res.status(200).json(req.body);
  res.end();
});


app.listen(port, () => {
  console.log('Server up on port ' + port);//eslint-disable-line
});
