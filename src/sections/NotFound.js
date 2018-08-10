import React, { Component, Redirect } from 'react';
import Title from '../components/Title.js';

class NotFound extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Title
        text={"Page Not Found"}
      />
    );
  }

}

export default NotFound;
