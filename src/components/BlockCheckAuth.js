import React, { Component } from 'react';
import AuthApi from '../AuthApi';

export default class BlockCheckAuth extends Component {
  constructor() {
    super();

    this.state = {

    };
  }

  checkAuth = () => {
    AuthApi.checkAuth({
      auth_key: window.getCookie('auth_key')
    });
  }

  render() {
    return (
      <div id="block-check-auth"className="block auth-login">
        <h2 className="uk-h3">Check Auth</h2>
        <button className="uk-button uk-button-primary" onClick={this.checkAuth}>Check Auth</button>
      </div>
    );
  }
}
