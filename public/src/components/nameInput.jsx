import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

class NameInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  update(e) {
    this.setState({
      name: e.target.value,
    });
  }

  clicked() {
    this.props.enterName(this.state.name);
  }

  render() {
    return (
      <Grid className="name">
        <Row>
          <Col xs={12} md={8}>
            Enter your name: <input value={this.state.name} onChange={this.update.bind(this)} id="input" />
            <Button id="pull-left" onClick={this.clicked.bind(this)} bsStyle="primary">Submit Name</Button>
          </Col>
        </Row>
      </Grid>);
  }
}

export default NameInput;
