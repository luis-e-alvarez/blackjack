import React from 'react';
import axios from 'axios';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';
import CardImage from './card.jsx';

class GamePlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerValues: [],
      playerImages: [],
      compValues: [],
      compImages: [],
      playerScore: 0,
      compScore: 0,
      message: '',
      newGame: false,
    };
  }

  componentWillMount() {
    this.setState({
      newGame: true,
    });
    this.beginGame();
  }

  beginGame() {
    axios.post('/draw', {
      id: this.props.id,
      numberOfCardsToDraw: 4,
    }).then((response) => {
      const playerVals = [response.data[0].value, response.data[1].value];
      const playerImages = [response.data[0].image, response.data[1].image];
      const compVals = [response.data[2].value, response.data[3].value];
      const compImages = [response.data[2].image, response.data[3].image];
      this.setState({
        playerValues: [...playerVals],
        playerImages: [...playerImages],
        compValues: [...compVals],
        compImages: [...compImages],
      });
    }).then(() => {
      const playerScore = this.state.playerValues.reduce((acc, cum) => {
        if (cum === 'JACK' || cum === 'KING' || cum === 'QUEEN') {
          return 10 + acc;
        } else if (cum === 'ACE') {
          const input = prompt(`Your hand has an Ace! Would you like it to equal 1 or 11? Your current hand has ${this.state.playerValues}`);
          return parseInt(input) + acc;
        }
        return parseInt(cum) + acc;
      }, 0);
      this.setState({
        playerScore,
      });
    }).then(() => {
      const compScore = this.state.compValues.reduce((acc, cum) => {
        if (cum === 'JACK' || cum === 'KING' || cum === 'QUEEN') {
          return 10 + acc;
        } else if (cum === 'ACE') {
          if (acc <= 10) {
            return 11 + acc;
          }
          return 1 + acc;
        }
        return parseInt(cum) + acc;
      }, 0);
      this.setState({
        compScore,
      });
    });
  }

  hit() {
    axios.post('/draw', {
      id: this.props.id,
      numberOfCardsToDraw: 1,
    }).then((response) => {
      const playerImages = [...this.state.playerImages, response.data[0].image];
      const playerValues = [...this.state.playerValues, response.data[0].value];
      this.setState({
        playerImages: [...playerImages],
        playerValues: [...playerValues],
      });
    }).then(() => {
      const playerScore = this.state.playerValues.reduce((acc, cum) => {
        if (cum === 'JACK' || cum === 'KING' || cum === 'QUEEN') {
          return 10 + acc;
        } else if (cum === 'ACE') {
          const input = prompt(`Your hand has an Ace! Would you like it to equal 1 or 11? Your current hand is ${this.state.playerValues}`);
          return parseInt(input) + acc;
        }
        return parseInt(cum) + acc;
      }, 0);
      this.setState({
        playerScore,
      });
    }).then(() => {
      this.checkIfPlayerLostGame();
    });
  }

  checkIfPlayerLostGame() {
    if (this.state.playerScore > 21) {
      this.setState({
        newGame: false,
        message: 'You Lose!',
      });
    }
  }

  checkIfComputerOrPlayerWonGame() {
    if (this.state.compScore <= 18) {
      this.stay();
    } else if (this.state.playerScore === this.state.compScore) {
      this.setState({
        newGame: false,
        message: 'It\'s a draw!',
      });
    } else if (this.state.compScore > 21 || this.state.playerScore === 21 || this.state.playerScore > this.state.compScore) {
      this.setState({
        newGame: false,
        message: 'You Win!',
      });
    } else if (this.state.compScore === 21 || this.state.compScore > this.state.playerScore) {
      this.setState({
        newGame: false,
        message: 'You Lose!',
      });
    }
  }

  async stay() {
    if (this.state.compScore <= 18) {
      const response = await axios.post('/draw', {
        id: this.props.id,
        numberOfCardsToDraw: 1,
      });
      const compImages = [...this.state.compImages, response.data[0].image];
      const compValues = [...this.state.compValues, response.data[0].value];
      this.setState({
        compImages: [...compImages],
        compValues: [...compValues],
      });
      const compScore = this.state.compValues.reduce((acc, cum) => {
        if (cum === 'JACK' || cum === 'KING' || cum === 'QUEEN') {
          return 10 + acc;
        } else if (cum === 'ACE') {
          if (acc <= 10) {
            return 11 + acc;
          }
          return 1 + acc;
        }
        return parseInt(cum) + acc;
      }, 0);
      this.setState({
        compScore,
      });
    }
    if (this.state.compScore >= 19) {
      this.checkIfComputerOrPlayerWonGame();
    } else {
      this.stay();
    }
  }

  newGame() {
    this.setState({
      playerValues: [],
      playerImages: [],
      compValues: [],
      compImages: [],
      playerScore: 0,
      compScore: 0,
      message: '',
      newGame: true,
    });
    this.beginGame();
  }

  render() {
    if (this.state.newGame === true) {
      return (
        <Grid>
          <Row>
            <Col xs={12} md={8}>
              <div className="score">
                <h2> {this.props.name}'s Cards </h2>
                <h2> Score: {this.state.playerScore} </h2>
                <Button onClick={this.hit.bind(this)} bsStyle="primary"> Hit </Button>
                <Button onClick={this.stay.bind(this)} bsStyle="primary"> Stay </Button>
              </div>
            </Col>
          </Row>
          <Row>
            {this.state.playerImages.map(image =>
                (<Col xs={6} md={4}>
                  <CardImage image={image} />
                 </Col>))}
          </Row>
          <Row>
            <Col xs={12} md={8}>
              <div className="score">
                <h2> Computer's Cards </h2>
                <h2> Score: {this.state.compScore} </h2>
              </div>
            </Col>
          </Row>
          <Row>
            {this.state.compImages.map(image =>
                (<Col xs={6} md={4}>
                  <CardImage image={image} />
                 </Col>))}
          </Row>
        </Grid>
      );
    }
    return (
      <Grid>
        <Row>
          <Col xs={12} md={8}>
            <Alert bsStyle="danger">
              <h2> {this.state.message} </h2>
              <Button onClick={this.newGame.bind(this)} bsStyle="primary"> Click Here to Play Again </Button>
            </Alert>
            <div className="score">
              <h2> {this.props.name}'s Cards </h2>
              <h2> Score: {this.state.playerScore} </h2>
            </div>
          </Col>
        </Row>
        <Row>
          {this.state.playerImages.map(image =>
                  (<Col xs={6} md={4}>
                    <CardImage image={image} />
                   </Col>))}
        </Row>
        <Row>
          <Col xs={12} md={8}>
            <div className="score">
              <h2> Computer's Cards </h2>
              <h2> Score: {this.state.compScore} </h2>
            </div>
          </Col>
        </Row>
        <Row>
          {this.state.compImages.map(image =>
                (<Col xs={6} md={4}>
                  <CardImage image={image} />
                 </Col>))}
        </Row>
      </Grid>
    );
  }
}

export default GamePlay;
