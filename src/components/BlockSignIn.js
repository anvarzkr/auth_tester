import React, { Component } from 'react';
import AuthApi from '../AuthApi';

export default class BlockSignUp extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  signIn = () => {
    AuthApi.signIn({
      email: this.state.email,
      password: this.state.password
    });
  }

  render() {
    return (
      <div id="block-auth-sign-in" className="block auth-register">
        <h2 className="uk-h3">Sign In</h2>
        <div className="uk-margin-small">
          <div className="uk-inline">
            <span className="uk-form-icon" uk-icon="icon: mail"></span>
            <input className="uk-input" name="email" value={this.state.email} onChange={this.onInputChange} type="text" placeholder="email" />
          </div>
        </div>
        <input type="hidden" />
        <div className="uk-margin-small">
          <div className="uk-inline">
            <span className="uk-form-icon" uk-icon="icon: lock"></span>
            <input className="uk-input" name="password" value={this.state.password} onChange={this.onInputChange} type="text" placeholder="password" />
          </div>
        </div>
        <button className="uk-button uk-button-primary" onClick={this.signIn}>Sign in</button>
      </div>
    );
  }
}
