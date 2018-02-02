import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

class BlackJack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
    };
  }

  componentWillMount() {
    if (this.state.id === '') {
      axios.post('/shuffle', {
        deck: 6,
      }).then((response) => {
        this.setState({
          id: response.data.deck_id,
        });
      });
    }
  }

  startGame() {
    this.props.startGame(this.state.id);
  }

  render() {
    return (
      <Grid className="introduction">
        <Row>
          <h2> Hello, {this.props.name} </h2>
          <h3> Let's play some blackjack! </h3>
          <Button onClick={() => this.startGame()} bsStyle="primary"> Start Game </Button>
        </Row>
      </Grid>
    );
  }
}

export default BlackJack;
