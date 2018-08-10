import React, { Component, Redirect } from 'react';
import Nav from '../components/Nav.js';
import Title from '../components/Title.js';
import Subtitle from '../components/Subtitle.js';
import Address from '../components/Address.js';
import { colors, fonts, borders } from '../styles';
import { Row, Col } from 'react-bootstrap';

class Profile extends Component {

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
            text={"Profile"}
          />
          <Subtitle
            text={this.props.userName}
          />
          <Address
            text={this.props.userAddress}
          />
          <Title
            text={"Your Socieites"}
          />
        </Col>
      </Row>
    );
  }

}

export default Profile;
