import React, { Component } from 'react';
import MessengerApi from '../MessengerApi';

export default class BlockDeleteChat extends Component {
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

  deleteChat = () => {
    MessengerApi.deleteChat({
      chatId: this.state.chatId
    });
  }

  render() {
    return (
      <div id="block-messenger-create-chat" className="block">
        <h2 className="uk-h3">Delete Chat</h2>
        <div className="uk-margin-small">
          <div className="uk-inline">
            <span className="uk-form-icon" uk-icon="icon: mail"></span>
            <input className="uk-input" name="chatId" value={this.state.chatId} onChange={this.onInputChange} type="text" placeholder="chat id" />
          </div>
        </div>
        <button className="uk-button uk-button-primary" onClick={this.deleteChat}>Submit</button>
      </div>
    );
  }
}
