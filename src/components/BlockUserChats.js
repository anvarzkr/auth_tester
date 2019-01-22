import React, { Component } from 'react';
import MessengerApi from '../MessengerApi';

export default class BlockUserChats extends Component {
  constructor() {
    super();

    this.state = {
      email: ''
    };
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  getUserChats = () => {
    MessengerApi.getUserChats({
      email: this.state.email
    });
  }

  render() {
    return (
      <div id="block-messenger-user-chats" className="block">
        <h2 className="uk-h3">User Chats</h2>
        <div className="uk-margin-small">
          <div className="uk-inline">
            <span className="uk-form-icon" uk-icon="icon: mail"></span>
            <input className="uk-input" name="email" value={this.state.email} onChange={this.onInputChange} type="text" placeholder="email" />
          </div>
        </div>
        <button className="uk-button uk-button-primary" onClick={this.getUserChats}>Submit</button>
      </div>
    );
  }
}
