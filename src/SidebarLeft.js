import React, { Component } from 'react';

export default class SidebarLeft extends Component {
  constructor() {
    super();

    this.state = {

    };
  }

  render() {
    return (
      <div className="sidebar-left">
        <ul className="uk-nav uk-nav-default">
        <li className="uk-nav-header">Messenger</li>
          <li><a href="#block-messenger-login">Login</a></li>
          <li><a href="#block-messenger-chat">Chat</a></li>
          <li><a href="#block-messenger-user-chats">User Chats</a></li>
          <li><a href="#block-messenger-create-chat">Create Chat</a></li>
          <li><a href="#block-messenger-invite-user">Invite User</a></li>
          <li><a href="#block-messenger-send-message">Send Message</a></li>
          <li><a href="#block-messenger-chat-users">Chat Users</a></li>

          <li className="uk-nav-header">Auth</li>
          <li><a href="#block-auth-sign-up">Sign Up</a></li>
          <li><a href="#block-auth-sign-in">Sign In</a></li>
          <li><a href="#block-auth-sign-out">Sign Out</a></li>
          <li><a href="#block-auth-check-auth">Check Auth</a></li>
          <li></li>
        </ul>
      </div>
    );
  }
}
