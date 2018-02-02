const axios = require('axios');

const shuffle = async (deck) => {
  const id = await axios({
    method: 'get',
    url: `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deck}`,
  });
  return id;
};

const draw = async (id, numberOfCardsToDraw) => {
  const cards = await axios({
    method: 'get',
    url: `https://deckofcardsapi.com/api/deck/${id}/draw/?count=${numberOfCardsToDraw}`,
  });
  return cards;
};

module.exports = { shuffle, draw };
