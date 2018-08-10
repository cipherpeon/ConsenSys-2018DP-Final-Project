import React, { Component } from 'react';
import SocietyBlock from '../components/SocietyBlock.js';
import { colors, fonts, borders } from '../styles';
import { Row, Col } from 'react-bootstrap';

import Title from '../components/Title.js';
import Subtitle from '../components/Subtitle.js';
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

  componentDidMount() {
    if (!this.props.registered) {
      history.pushState(null, '/404')
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
          let currentAdmin;

          currentAddress = result;
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

    return (
      <Col xs={12} sm={8}>
        <Title
          text={"Profile"}
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
        <BlockWrapper>
          {this.state.societies.length > 0 && this.state.societies.map(society => {
            return(
              <SocietyBlock
                address={society.address}
                name={society.name}
                location={society.location}
                admin={society.admin}
              />
            );
          })}
        </BlockWrapper>
      </Col>
    );
  }

}

export default Profile;
