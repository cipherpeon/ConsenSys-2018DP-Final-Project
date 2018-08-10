import React, { Component, Redirect } from 'react';
import Title from '../components/Title.js';
import { colors, fonts, borders } from '../styles';
import { Row, Col } from 'react-bootstrap';

class Explore extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.registered) {
      history.pushState(null, '/404')
    }
  }

  render() {
    return (
      <Col xs={12} sm={8}>
        <Title
          text={"Explore"}
        />
      </Col>
    );
  }

}

export default Explore;
