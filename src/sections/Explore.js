import React, { Component, Redirect } from 'react';
import Nav from '../components/Nav.js';
import Title from '../components/Title.js';
import { colors, fonts, borders } from '../styles';
import { Row, Col } from 'react-bootstrap';

class Explore extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>
        <Col xs={12} sm={4}>
          <Nav
            routes={['/profile', '/explore']}
          />
        </Col>
        <Col xs={12} sm={8}>
          <Title
            text={"Explore"}
          />
        </Col>
      </Row>
    );
  }

}

export default Explore;
