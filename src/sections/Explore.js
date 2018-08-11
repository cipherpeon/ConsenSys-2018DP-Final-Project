import React, { Component, Redirect } from 'react';
import Title from '../components/Title.js';
import { colors, fonts, borders, lines } from '../styles';
import { Row, Col } from 'react-bootstrap';
import Input from '../components/Input.js';
import BlockWrapper from '../components/BlockWrapper.js';
import Button from '../components/Button.js';
import SocietyBlock from '../components/SocietyBlock.js';

import Society from '../../build/contracts/Society.json'
const contract = require('truffle-contract');
const society = contract(Society);

class Explore extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchAddress: '',
      society: null,
    }
    this.onSearchAddressChange = this.onSearchAddressChange.bind(this);
    this.getSociety = this.getSociety.bind(this);
  }

  componentWillMount() {
    if (!this.props.registered) {
      history.pushState(null, '/404')
    }
  }

  componentWillReceiveProps(props) {
    if (!this.props.web3 && props.web3) {
      society.setProvider(props.web3.currentProvider);
    }
  }

  onSearchAddressChange(event) {
    this.setState({
      searchAddress: event.target.value
    })
  }

  getSociety() {

    let current = {}
    let currentAddress;
    let currentName;
    let currentLocation;
    let currentAdmin;

    currentAddress = this.state.searchAddress;

    if (!this.props.web3.isAddress(currentAddress)) {
      alert('Invalid address!');
      this.setState({
        society: null,
      });
      return;
    }

    society.at(currentAddress).name.call().then(name => {
      currentName = name;
      return society.at(currentAddress).location.call();
    }).then(location => {
      currentLocation = location;
      return society.at(currentAddress).admin.call();
    }).then(admin => {
      currentAdmin = admin;
      current = {
        address: currentAddress,
        name: currentName,
        location: currentLocation,
        admin: currentAdmin,
      }
      this.setState({
        society: current,
      });
    }).catch(e => {
      this.setState({
        society: null,
      });
    });

  }

  render() {

    let searchResult;

    if (this.state.society) {
      searchResult =
      <SocietyBlock
        address={this.state.society.address}
        name={this.state.society.name}
        location={this.state.society.location}
        admin={(this.state.society.admin == this.props.userAddress
        ? "You" : this.state.society.admin)}
      />
    }

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
          <Button
            color={colors.darkGrey}
            hoverColor={colors.metamask}
            activeColor={colors.metamaskDarker}
            size={fonts.size.medium}
            border={borders.width.thick}
            text="Go"
            onClick={this.getSociety}
            disabled={this.state.searchAddress.length == 0}
          />
          {searchResult}
        </BlockWrapper>
      </Col>
    );
  }

}

export default Explore;
