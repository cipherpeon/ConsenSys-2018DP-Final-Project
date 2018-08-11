import React, { Component, Redirect } from 'react';
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
      newLogoHash: '',
      created: false,
    }

    this.onNewNameChange = this.onNewNameChange.bind(this);
    this.onNewLocationChange = this.onNewLocationChange.bind(this);
    this.onNewLogoHashChange = this.onNewLogoHashChange.bind(this);
    this.createSociety = this.createSociety.bind(this);
  }

  componentWillMount() {
    if (!this.props.registered) {
      history.pushState(null, '/404')
    }
  }

  onNewNameChange(event) {
    this.setState({
      newName: event.target.value
    })
  }

  onNewLocationChange(event) {
    this.setState({
      newLocation: event.target.value
    })
  }

  onNewLogoHashChange(event) {
    this.setState({
      newLogoHash: event.target.value
    })
  }

  createSociety() {

    let result = this.props.dataInstance.createSociety(this.state.newName,
      this.state.newLocation, this.state.newLogoHash, {from:this.props.userAddress}).then(value => {
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
            placeholder="Name (required)"
            onChange={this.onNewNameChange}
            value={this.state.newName}
            length={lines.length.medium}
            disabled={this.state.created}
          />
          <Input
            placeholder="Location (required)"
            onChange={this.onNewLocationChange}
            value={this.state.newLocation}
            length={lines.length.medium}
            disabled={this.state.created}
          />
          <Input
            placeholder="Logo Hash (optional)"
            onChange={this.onNewLogoHashChange}
            value={this.state.newLogoHash}
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
            this.state.newLocation.length == 0)}
          />
        </BlockWrapper>
      </Col>
    );
  }

}

export default Create;
