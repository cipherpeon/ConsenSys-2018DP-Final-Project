import React, { Component, Redirect } from 'react';
import Title from '../components/Title.js';
import { colors, fonts, borders, lines } from '../styles';
import { Row, Col } from 'react-bootstrap';
import Subtitle from '../components/Subtitle.js';
import BlockWrapper from '../components/BlockWrapper.js';

class Stats extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: 0,
      societies: 0,
    }
  }

  componentWillReceiveProps(props) {
    // if the updated props have come in
    if (!this.props.dataInstance && props.dataInstance) {
      props.dataInstance.numberOfUsers.call().then(users => {
        this.setState({
          users: users
        });
        return props.dataInstance.numberOfSocieties.call();
      }).then(societies => {
        this.setState({
          societies: societies
        });
        return props.dataInstance.totalDonations.call();
      }).then(donations => {
        let amount = this.props.web3.fromWei(donations, "ether");
        this.setState({
          donations: amount
        })
      })
    }
  }



  render() {

    return (
      <Col xs={12} sm={9}>
        <Title
          text={"Stats"}
        />
        <BlockWrapper>
          <Subtitle
            text={"Number of users: " + this.state.users}
          />
          <Subtitle
            text={"Number of societies: " + this.state.societies}
          />
          <Subtitle
            text={"Total donated: " + this.state.donations + " ETH"}
          />
        </BlockWrapper>
      </Col>
    );
  }

}

export default Stats;
