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

class Donate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchAddress: '',
      donationAmount: '',
      society: null,
      isMember: false,
    }
    this.onSearchAddressChange = this.onSearchAddressChange.bind(this);
    this.onDonationAmountChange = this.onDonationAmountChange.bind(this);
    this.getSociety = this.getSociety.bind(this);
    this.donate = this.donate.bind(this);
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

  onDonationAmountChange(event) {
    this.setState({
      donationAmount: event.target.value
    })
  }

  getSociety() {

    let current = {}
    let currentAddress;
    let currentName;
    let currentLocation;
    let currentIsMember;
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
      return society.at(currentAddress).userIsMember.call(this.props.userAddress);
    }).then(isMember => {
      currentIsMember = isMember;
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
        isMember: currentIsMember,
      });
    }).catch(e => {
      alert('No society registered at this address!');
      this.setState({
        society: null,
      });
    });

  }

  donate() {

    let currentAddress = this.state.searchAddress;

    if (!this.props.web3.isAddress(currentAddress)) {
      alert('Invalid address!');
      this.setState({
        society: null,
      });
      return;
    }

    let amount = this.props.web3.toWei(this.state.donationAmount)
    let success = this.props.dataInstance.makeDonation(currentAddress,
      {from:this.props.userAddress, value:amount}).then(result => {
      return result;
    });

    return success;
  }

  render() {

    return (
      <Col xs={12} sm={9}>
        <Title
          text={"Donate"}
        />
        <BlockWrapper>
          <Input
            placeholder="Enter society contract address"
            onChange={this.onSearchAddressChange}
            value={this.state.searchAddress}
            length={lines.length.max}
          />
          <Input
            placeholder="Enter donation amount in ETH"
            onChange={this.onDonationAmountChange}
            value={this.state.donationAmount}
            length={lines.length.max}
            type="number"
          />
          <Button
            color={colors.darkGrey}
            hoverColor={colors.metamask}
            activeColor={colors.metamaskDarker}
            size={fonts.size.medium}
            border={borders.width.thick}
            text="Go"
            onClick={this.donate}
            disabled={this.state.searchAddress.length == 0 ||
              this.state.donationAmount.length == 0}
          />
        </BlockWrapper>
      </Col>
    );
  }

}

export default Donate;
