const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/index.js');

const should = chai.should();

chai.use(chaiHttp);

describe('/draw', () => {
  it('it should return 2 drawn cards', (done) => {
    chai.request(server)
      .post('/draw')
      .send({ id: '8atx6u9qozsg', numberOfCardsToDraw: 2 })
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.be.a('string');
        JSON.parse(res.text).length.should.equal(2);
        done();
      });
  });
  it('it should return 4 drawn cards', (done) => {
    chai.request(server)
      .post('/draw')
      .send({ id: '8atx6u9qozsg', numberOfCardsToDraw: 4 })
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.be.a('string');
        JSON.parse(res.text).length.should.equal(4);
        done();
      });
  });
});

describe('/shuffle', () => {
  let deck = '';
  it('it should return a deck with ID', (done) => {
    chai.request(server)
      .post('/shuffle')
      .send({ deck: 6 })
      .end((err, res) => {
        res.should.have.status(200);
        deck = JSON.parse(res.text);
        deck.deck_id.should.be.a('string');
        done();
      });
  });
  it('should return a brand new deck', (done) => {
    chai.request(server)
      .post('/shuffle')
      .send({ deck: 6 })
      .end((err, res) => {
        res.should.have.status(200);
        const newDeck = JSON.parse(res.text);
        newDeck.deck_id.should.not.equal(deck.deck_id);
        done();
      });
  });

  describe('/shuffle', () => {
    it('it should return the sum given two parameters', (done) => {
      chai.request(server)
        .post('/test')
        .send({ x: 6, y: 5 })
        .end((err, res) => {
          const { sum } = JSON.parse(res.text);
          sum.should.equal(11);
          done();
        });
    });
  });
});
