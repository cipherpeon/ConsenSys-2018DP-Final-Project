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
    this.joinSociety = this.joinSociety.bind(this);
    this.manageSociety = this.manageSociety.bind(this);
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
      alert('No society registered at this address!');
      this.setState({
        society: null,
      });
    });

  }

  joinSociety() {
    alert('join')
  }

  manageSociety() {
    alert('manage')
  }

  render() {

    let searchResult;

    if (this.state.society) {
      // tell user if they're an admin instead of showing address
      let adminText = this.state.society.admin;
      let isAdmin = false;
      if (this.state.society.admin == this.props.userAddress) {
        adminText = "You";
        isAdmin = true;
      }

      // show join or manage button accordingly
      let buttonText;
      let buttonFunction;
      if (isAdmin) {
        buttonText = "Manage";
        buttonFunction = this.manageSociety;
      } else {
        buttonText = "Join";
        buttonFunction = this.joinSociety;
      }

      // render search result
      searchResult =
      <SocietyBlock
        address={this.state.society.address}
        name={this.state.society.name}
        location={this.state.society.location}
        admin={adminText}
        buttonText={buttonText}
        buttonFunction={buttonFunction}
      />
    }

    return (
      <Col xs={12} sm={9}>
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
        </BlockWrapper>
        {searchResult ?
          <div>
            <Title
              text="Result"
            />
            <BlockWrapper>
              {searchResult}
            </BlockWrapper>
          </div>
        : null}
      </Col>
    );
  }

}

export default Explore;
