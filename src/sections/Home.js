import React, { Component, Redirect } from 'react';
import Button from '../components/Button.js';
import Title from '../components/Title.js';
import Subtitle from '../components/Subtitle.js';
import Line from '../components/Line.js';
import Input from '../components/Input.js';
import { colors, fonts, borders } from '../styles';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      waiting: false,
      newName: '',
    }

    this.addNewUser = this.addNewUser.bind(this);
    this.onUnregisteredNameChange = this.onUnregisteredNameChange.bind(this);
  }

  addNewUser() {

    if (this.props.registered || this.state.newName.length == 0) return;

    let result = this.props.dataInstance.addNewUser(this.state.newName, {from:this.props.userAddress}).then(value => {
      this.setState({
        waiting: true,
      })
      return value;
    });

  }

  onUnregisteredNameChange(event) {

    if (this.props.registered) return;

    this.setState({
      newName: event.target.value
    })
  }

  render() {

    let message;
    let button;

    if (this.props.registered) {
      let txt = "Welcome back, " + this.props.userName;
      message = <Subtitle
        text={txt}
      />
      button =
      <Button
        color={colors.darkGrey}
        hoverColor={colors.metamask}
        activeColor={colors.metamaskDarker}
        size={fonts.size.medium}
        border={borders.width.thick}
        text="Continue"
        href="/profile"
      />
    } else {
      if (this.state.waiting) {
        message = <div>
          <Title
            text="Waiting..."
          />
          <Subtitle
            text="Reload once the transaction has been confirmed"
          />
        </div>

      } else {
        message =
        <Input
          placeholder="What's your name?"
          onChange={this.onUnregisteredNameChange}
          value={this.state.newName}
        />
        button =
        <Button
          color={colors.darkGrey}
          hoverColor={colors.metamask}
          activeColor={colors.metamaskDarker}
          size={fonts.size.medium}
          border={borders.width.thick}
          text="Register"
          onClick={this.addNewUser}
        />
      }

    }

    return (
      <div>
        {message}
        {button}
      </div>
    );
  }

}

export default Home;
