import React, { Component } from 'react';
import MessengerApi from '../MessengerApi';

export default class BlockChatUsers extends Component {
  constructor() {
    super();

    this.state = {
      chatId: ''
    };
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  getChatUsers = () => {
    MessengerApi.getChatUsers({
      chatId: this.state.chatId
    });
  }

  render() {
    return (
      <div id="block-messenger-chat-users" className="block">
        <h2 className="uk-h3">Chat Users</h2>
        <div className="uk-margin-small">
          <div className="uk-inline">
            <span className="uk-form-icon" uk-icon="icon: mail"></span>
            <input className="uk-input" name="chatId" value={this.state.chatId} onChange={this.onInputChange} type="text" placeholder="chat id" />
          </div>
        </div>
        <button className="uk-button uk-button-primary" onClick={this.getChatUsers}>Submit</button>
      </div>
    );
  }
}
