import React, { Component, Redirect } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import Title from '../components/Title.js';
import Text from '../components/Text.js';
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
      searchLocation: '',
      societies: [],
    }
    this.onSearchLocationChange = this.onSearchLocationChange.bind(this);
    this.getSocietiesInLocation = this.getSocietiesInLocation.bind(this);
  }

  componentWillReceiveProps(props) {
    if (!this.props.web3 && props.web3) {
      society.setProvider(props.web3.currentProvider);
    }
  }

  onSearchLocationChange(value) {
    this.setState({
      searchLocation: value
    })
  }

  getSocietiesInLocation() {
    this.props.dataInstance.getSocietiesInLocation.call(this.state.searchLocation).then(results => {
      results.forEach(result => {

        let societies = [];
        let current = {};
        let currentAddress;
        let currentName;
        let currentLocation;
        let currentSocialLink;
        let currentAdmin;
        let currentIsMember;

        currentAddress = result;

        society.at(currentAddress).name.call().then(name => {
          currentName = name;
          return society.at(currentAddress).location.call();
        }).then(location => {
          currentLocation = location;
          return society.at(currentAddress).userIsMember.call(this.props.userAddress);
        }).then(isMember => {
          currentIsMember = isMember;
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
            isMember: currentIsMember
          }

          societies = this.state.societies;
          societies.push(current);
          this.setState({
            societies: societies,
          });
        }).catch(e => {
          alert('No society registered at this address!');
          this.setState({
            society: null,
          });
        });
      })
    });
  }

  render() {

    let searchResult;

    if (this.state.societies.length > 0) {

      searchResult = this.state.societies.map(society => {
        // tell user if they're an admin instead of showing address
        let adminText = society.admin;
        let isAdmin = false;
        if (society.admin == this.props.userAddress) {
          adminText = "You";
          isAdmin = true;
        }

        // render search result
        return(
        <SocietyBlock
            address={society.address}
            name={society.name}
            location={society.location}
            admin={adminText}
            socialLink={society.socialLink}
          />
        );
      })

    }

    return (
      <Col xs={12} sm={9}>
        <Title
          text={"Explore"}
        />
        <Text
          text={"Find a society near you. Nothing there? Start a new one on the Create page!"}
        />
        <BlockWrapper>
          <CountryDropdown
            value={this.state.searchLocation}
            onChange={(val) => this.onSearchLocationChange(val)}
          />
          <Button
            color={colors.darkGrey}
            hoverColor={colors.metamask}
            activeColor={colors.metamaskDarker}
            size={fonts.size.medium}
            border={borders.width.thick}
            text="Go"
            onClick={this.getSocietiesInLocation}
            disabled={this.state.searchLocation.length == 0}
          />
        </BlockWrapper>
        {searchResult ?
          <div>
            <Title
              text="Results"
            />
            <Text
              text={"To interact with a society, enter the contract address from below in the Manage page."}
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
