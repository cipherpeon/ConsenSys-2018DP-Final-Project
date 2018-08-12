import React, { Component } from 'react';
import SocietyBlock from '../components/SocietyBlock.js';
import { colors, fonts, borders } from '../styles';
import { Row, Col } from 'react-bootstrap';

import Title from '../components/Title.js';
import Subtitle from '../components/Subtitle.js';
import Text from '../components/Text.js';
import Address from '../components/Address.js';
import BlockWrapper from '../components/BlockWrapper.js';

import Society from '../../build/contracts/Society.json'
const contract = require('truffle-contract');
const society = contract(Society);

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      societies: [],
    }
  }

  componentWillReceiveProps(props) {
    // if the updated props have come in
    if (!this.props.dataInstance && props.dataInstance) {
      society.setProvider(props.web3.currentProvider);
      props.dataInstance.userGetMemberships.call(props.userAddress).then(results => {

        results.forEach(result => {

          let societies = []
          let current = {}
          let currentAddress;
          let currentName;
          let currentLocation;
          let currentSocialLink;
          let currentAdmin;

          currentAddress = result;
          society.at(currentAddress).name.call().then(name => {
            currentName = name;
            return society.at(currentAddress).location.call();
          }).then(location => {
            currentLocation = location;
            return society.at(currentAddress).socialLink.call();
          }).then(socialLink => {
            currentSocialLink = socialLink;
            return society.at(currentAddress).admin.call();
          }).then(admin => {
            currentAdmin = admin;
            current = {
              address: currentAddress,
              name: currentName,
              location: currentLocation,
              admin: currentAdmin,
              socialLink: currentSocialLink,
            }
            societies = this.state.societies;
            societies.push(current);
            this.setState({
              societies: societies,
            });
          })
        });
      })
    }
  }

  render() {

    let blocks;

    if (this.state.societies.length > 0) {
      blocks =
      this.state.societies.map(society => {
        if (society.admin == this.props.userAddress) {
          society.admin = "You";
        }

        return(
          <SocietyBlock
            address={society.address}
            name={society.name}
            location={society.location}
            admin={society.admin}
            socialLink={society.socialLink}
          />
        );
      })
    } else {
      blocks =
        <Subtitle
          text="You haven't joined or created any yet"
        />
    }

    return (
      <Col xs={12} sm={9}>
        <Title
          text={"Profile"}
        />
        <Text
          text={"This is the only personal data held in the smart contract."}
        />
        <BlockWrapper>
          <Subtitle
            text={this.props.userName}
          />
          <Address
            text={this.props.userAddress}
          />
        </BlockWrapper>
        <Title
          text={"Your Societies"}
        />
        <Text
          text={"To interact with a society, enter the contract address from below in the Manage page."}
        />
        <BlockWrapper>
          {blocks}
        </BlockWrapper>
      </Col>
    );
  }

}

export default Profile;
