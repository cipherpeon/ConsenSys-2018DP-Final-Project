import React, { Component, Redirect } from 'react';
import Title from '../components/Title.js';
import { colors, fonts, borders, lines } from '../styles';
import { Row, Col } from 'react-bootstrap';
import Input from '../components/Input.js';
import BlockWrapper from '../components/BlockWrapper.js';

class Explore extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchAddress: '',
    }
    this.onSearchAddressChange = this.onSearchAddressChange.bind(this);
  }

  componentWillMount() {
    if (!this.props.registered) {
      history.pushState(null, '/404')
    }
  }

  onSearchAddressChange(event) {
    this.setState({
      searchAddress: event.target.value
    })
  }

  render() {
    return (
      <Col xs={12} sm={8}>
        <Title
          text={"Explore"}
        />
        <BlockWrapper>
          <Input
            placeholder="Enter society contract address"
            onChange={this.onSearchAddressChange}
            value={this.state.searchAddress}
            length={lines.length.max}
          />
        </BlockWrapper>
      </Col>
    );
  }

}

export default Explore;
