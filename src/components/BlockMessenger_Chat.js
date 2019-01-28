import React, { Component } from 'react';
import MessengerApi from '../MessengerApi';
import Messenger from './Messenger';

export default class BlockMessenger_Chat extends Component {
  constructor() {
    super();
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div id="block-messenger-chat" className="block">
        <h2 className="uk-h3">Chat</h2>
        <div className="uk-margin-small">
          <Messenger
            sendMessage={this.props.sendMessage}
            createChat={this.props.createChat}
            chats={this.props.userChats}
            messages={this.props.chatMessages}
            userEmail={this.props.userEmail}
            />
        </div>
      </div>
    );
  }
}
