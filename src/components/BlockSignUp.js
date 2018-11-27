import React, { Component } from 'react';
import AuthApi from '../AuthApi';

export default class BlockSignUp extends Component {
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

  signUp = () => {
    AuthApi.signUp({
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation
    });
  }

  render() {
    return (
      <div id="block-sign-up" className="block auth-register">
        <h2 className="uk-h3">Sign Up</h2>
        <div className="uk-margin-small">
          <div className="uk-inline">
            <span className="uk-form-icon" uk-icon="icon: mail"></span>
            <input className="uk-input" name="email" value={this.state.email} onChange={this.onInputChange} type="text" placeholder="email" />
          </div>
        </div>
        <div className="uk-margin-small">
          <div className="uk-inline">
            <span className="uk-form-icon" uk-icon="icon: user"></span>
            <input className="uk-input" name="username" value={this.state.username} onChange={this.onInputChange} type="text" placeholder="username" />
          </div>
        </div>
        <div className="uk-margin-small">
          <div className="uk-inline">
            <span className="uk-form-icon" uk-icon="icon: lock"></span>
            <input className="uk-input" name="password" value={this.state.password} onChange={this.onInputChange} type="password" placeholder="password" />
          </div>
        </div>
        <div className="uk-margin-small">
          <div className="uk-inline">
            <span className="uk-form-icon" uk-icon="icon: lock"></span>
            <input className="uk-input" name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.onInputChange} type="password" placeholder="password confirmation" />
          </div>
        </div>
        <button className="uk-button uk-button-primary" onClick={this.signUp}>Sign up</button>
      </div>
    );
  }
}
