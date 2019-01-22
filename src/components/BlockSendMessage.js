import React, { Component } from 'react';
import MessengerApi from '../MessengerApi';

export default class BlockSendMessage extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      chatId: '',
      message: ''
    };
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  sendMessage = () => {
    MessengerApi.sendMessage({
      email: this.state.email,
      chatId: this.state.chatId,
      message: this.state.message
    });
  }

  render() {
    return (
      <div id="block-messenger-send-message" className="block">
        <h2 className="uk-h3">Send Message</h2>
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
        <div className="uk-margin-small">
          <div className="uk-inline">
            <span className="uk-form-icon" uk-icon="icon: mail"></span>
            <input className="uk-input" name="message" value={this.state.message} onChange={this.onInputChange} type="text" placeholder="message" />
          </div>
        </div>
        <button className="uk-button uk-button-primary" onClick={this.sendMessage}>Submit</button>
      </div>
    );
  }
}
