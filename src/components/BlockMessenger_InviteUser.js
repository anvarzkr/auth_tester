import React, { Component } from 'react';
import MessengerApi from '../MessengerApi';

export default class BlockMessenger_InviteUser extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      chatId: ''
    };
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  inviteUser = () => {
    // MessengerApi.inviteUser({
    //   email: this.state.email,
    //   chatId: this.state.chatId
    // });
    this.props.ws_inviteUserToChat({
      users: this.state.email,
      id: this.state.chatId
    });
  }

  render() {
    return (
      <div id="block-messenger-invite-user" className="block">
        <h2 className="uk-h3">Invite User</h2>
        <div className="uk-margin-small">
          <div className="uk-inline">
            <span className="uk-form-icon" uk-icon="icon: mail"></span>
            <input className="uk-input" name="email" value={this.state.email} onChange={this.onInputChange} type="text" placeholder="user email" />
          </div>
        </div>
        <div className="uk-margin-small">
          <div className="uk-inline">
            <span className="uk-form-icon" uk-icon="icon: mail"></span>
            <input className="uk-input" name="chatId" value={this.state.chatId} onChange={this.onInputChange} type="text" placeholder="chat id" />
          </div>
        </div>
        <button className="uk-button uk-button-primary" onClick={this.inviteUser}>Submit</button>
      </div>
    );
  }
}
