import React, { Component } from 'react';
import MessengerApi from '../MessengerApi';

export default class BlockMessenger_CreateChat extends Component {
  constructor() {
    super();

    this.state = {
      // email: '',
      chatName: ''
    };
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  createChat = () => {
    // MessengerApi.createChat({
    //   email: this.state.email,
    //   chatName: this.state.chatName
    // });
    this.props.ws_createChat({
      // email: this.state.email,
      chatName: this.state.chatName,
    });
    this.props.ws_getUserChats({
      // email: this.state.email,
    });
  }

  render() {
    return (
      <div id="block-messenger-create-chat" className="block">
        <h2 className="uk-h3">Create Chat</h2>
        <div className="uk-margin-small">
          <div className="uk-inline">
            <span className="uk-form-icon" uk-icon="icon: mail"></span>
            <input className="uk-input" name="chatName" value={this.state.chatName} onChange={this.onInputChange} type="text" placeholder="chat name" />
          </div>
        </div>
        <button className="uk-button uk-button-primary" onClick={this.createChat}>Submit</button>
      </div>
    );
  }
}
