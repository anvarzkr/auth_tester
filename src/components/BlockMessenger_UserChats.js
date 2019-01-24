import React, { Component } from 'react';
import MessengerApi from '../MessengerApi';

export default class BlockMessenger_UserChats extends Component {
  constructor() {
    super();

    this.state = {
      // email: ''
    };
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  getUserChats = () => {
    // MessengerApi.getUserChats({
    //   email: this.state.email
    // });
    this.props.ws_getUserChats({
      // email: this.state.email
    });
  }

  render() {
    return (
      <div id="block-messenger-user-chats" className="block">
        <h2 className="uk-h3">User Chats</h2>
        <button className="uk-button uk-button-primary" onClick={this.getUserChats}>Submit</button>
      </div>
    );
  }
}
