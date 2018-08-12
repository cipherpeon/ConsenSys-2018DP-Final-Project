import React, { Component, Redirect } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import Title from '../components/Title.js';
import { colors, fonts, borders, lines } from '../styles';
import { Row, Col } from 'react-bootstrap';

import Button from '../components/Button.js';
import Input from '../components/Input.js';
import BlockWrapper from '../components/BlockWrapper.js';

class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newName: '',
      newLocation: '',
      newSocialLink: '',
      created: false,
    }

    this.onNewNameChange = this.onNewNameChange.bind(this);
    this.onNewLocationChange = this.onNewLocationChange.bind(this);
    this.onSocialLinkChange = this.onSocialLinkChange.bind(this);
    this.createSociety = this.createSociety.bind(this);
  }

  onNewNameChange(event) {
    this.setState({
      newName: event.target.value
    })
  }

  onNewLocationChange(value) {
    this.setState({
      newLocation: value
    })
  }

  onSocialLinkChange(event) {
    this.setState({
      newSocialLink: event.target.value
    })
  }

  createSociety() {

    let result = this.props.dataInstance.createSociety(this.state.newName,
      this.state.newLocation, this.state.newSocialLink, {from:this.props.userAddress}).then(value => {
      this.setState({
        created: true,
      })
      return value;
    });

  }

  render() {
    return (
      <Col xs={12} sm={9}>
        <Title
          text={"Create"}
        />
        <BlockWrapper>
          <Input
            placeholder="Name"
            onChange={this.onNewNameChange}
            value={this.state.newName}
            length={lines.length.medium}
            disabled={this.state.created}
          />
          <CountryDropdown
            value={this.state.newLocation}
            onChange={(val) => this.onNewLocationChange(val)}
            disabled={this.state.created}
          />
          <Input
            placeholder="Social Link"
            onChange={this.onSocialLinkChange}
            value={this.state.newSocialLink}
            length={lines.length.medium}
            disabled={this.state.created}
          />
          <Button
            color={colors.darkGrey}
            hoverColor={colors.metamask}
            activeColor={colors.metamaskDarker}
            size={fonts.size.medium}
            border={borders.width.thick}
            text="Go"
            onClick={this.createSociety}
            disabled={this.state.created ||
            (this.state.newName.length == 0 ||
            this.state.newLocation.length == 0 ||
            this.state.newSocialLink.length == 0)}
          />
        </BlockWrapper>
      </Col>
    );
  }

}

export default Create;
