import React, { Component } from 'react';
import AuthApi from '../AuthApi';

export default class BlockSignOut extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      username: '',
      password: '',
      passwordConfirmation: ''
    };
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  signOut = () => {
    AuthApi.signOut({
      ['access-token']: window.getCookie('access-token')
    });
  }

  render() {
    return (
      <div id="block-sign-out" className="block auth-register">
        <h2 className="uk-h3">Sign Out</h2>
        <button className="uk-button uk-button-danger" onClick={this.signOut}>Sign Out</button>
      </div>
    );
  }
}
