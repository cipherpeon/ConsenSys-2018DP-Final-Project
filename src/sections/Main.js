import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { Row, Col } from 'react-bootstrap';

import Nav from '../components/Nav.js';

import Home from './Home.js';
import Profile from './Profile.js';
import Explore from './Explore.js';
import NotFound from './NotFound.js';

import getWeb3 from '../utils/getWeb3'
import SociethyData from '../../build/contracts/SociethyData.json'

class Main extends Component {

  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      societhyDataInstance: null,
      userName: null,
      userAddress: null,
      registered: false,
    }

  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const societhyData = contract(SociethyData)
    societhyData.setProvider(this.state.web3.currentProvider)

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.setState({
        userAddress: accounts[0],
      });

      societhyData.deployed().then((instance) => {
        this.setState({
          societhyDataInstance: instance,
        })

        // Stores a given value, 5 by default.
        return instance.userExists.call(accounts[0]);
      }).then(result => {
        // Get the value from the contract to prove it worked.
        this.setState({
          registered: result,
        });

        return this.state.societhyDataInstance.userGetName.call(accounts[0]);
      }).then(result => {

        this.setState({
          userName: (result ? result : undefined),
        })
      })

    })
  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' render={() =>
            <Home
              societhyDataInstance={this.state.societhyDataInstance}
              userName={this.state.userName}
              userAddress={this.state.userAddress}
              registered={this.state.registered}
              addNewUser={this.addNewUser}
              onUnregisteredNameChange={this.onUnregisteredNameChange}
            />
          }/>
          <Route path='/profile' render={() =>
            <Row>
              <Col xs={12} sm={4}>
                <Nav
                  routes={['/profile', '/explore']}
                />
              </Col>
              <Profile
                societhyDataInstance={this.state.societhyDataInstance}
                userName={this.state.userName}
                userAddress={this.state.userAddress}
              />
            </Row>
          }/>
          <Route path='/explore' render={() =>
            <Row>
              <Col xs={12} sm={4}>
                <Nav
                  routes={['/profile', '/explore']}
                />
              </Col>
              <Explore/>
            </Row>
          }/>
          <Route component={NotFound} />
        </Switch>
      </main>
    );
  }
}

export default Main;
