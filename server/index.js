const express = require('express');
const bodyParser = require('body-parser');
const blackjack = require('./blackjackHelpers.js');

const app = express();
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../public/dist`));
app.set('port', process.env.PORT || 3000);

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

app.post('/shuffle', asyncMiddleware(async (req, res, next) => {
  const { deck } = req.body;
  const id = await blackjack.shuffle(deck);
  res.status(200);
  res.end(JSON.stringify(id.data));
}));

app.post('/draw', asyncMiddleware(async (req, res, next) => {
  const { id, numberOfCardsToDraw } = req.body;
  const results = await blackjack.draw(id, numberOfCardsToDraw);
  res.status(200);
  res.send(JSON.stringify(results.data.cards));
}));

app.post('/test', asyncMiddleware(async (req, res, next) => {
  const x = parseInt(req.body.x, 0);
  const y = parseInt(req.body.y, 0);
  if (isNaN(x) || isNaN(y)) {
    res.status(404);
    res.send('error');
  } else {
    const sum = x + y;
    res.status(200);
    res.send(JSON.stringify({ sum }));
  }
}));

app.listen(app.get('port'), () => {
  console.log(`listening on port ${app.get('port')}`);
});

module.exports = app;
