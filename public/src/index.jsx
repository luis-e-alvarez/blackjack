import React from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import ReactDOM from 'react-dom';
import NameInput from './components/nameInput.jsx';
import BlackJack from './components/blackjack.jsx';
import GamePlay from './components/gameplay.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      id: '',
    };
  }

  enterName(value) {
    const splitName = value.split(' ');
    splitName.forEach((val, index) => {
      splitName[index] = val[0].toUpperCase() + val.slice(1, val.length).toLowerCase();
    });
    const correctedName = splitName.join(' ');
    this.setState({
      name: correctedName,
    });
  }

  startGame(id) {
    this.setState({
      id,
    });
  }

  conditionalRender() {
    if (this.state.name === '') {
      return (
        <div>
          <NameInput enterName={this.enterName.bind(this)} />
        </div>
      );
    }
    if (this.state.id === '') {
      return (
        <div>
          <BlackJack startGame={this.startGame.bind(this)} name={this.state.name} />
        </div>
      );
    }
    return (
      <div>
        <GamePlay id={this.state.id} name={this.state.name} />
      </div>
    );
  }

  render() {
    return (
      <div>
        <PageHeader className="title"> BlackJack! </PageHeader>
        <div> {this.conditionalRender()} </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
