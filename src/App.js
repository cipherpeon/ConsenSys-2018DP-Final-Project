import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Title from './components/Title.js';
import Subtitle from './components/Subtitle.js';

import Main from './sections/Main.js';

class App extends Component {

  render() {

    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Title
              text={"Societhy"}
              underline
            />
            <Subtitle
              text={"A decentralised meetup platform built on Ethereum"}
            />
          </Col>
        </Row>
        <Main/>
      </Grid>
    );
  }
}

export default App;
