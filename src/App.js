import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SidebarLeft from './SidebarLeft';
import BlockSignUp from './components/BlockSignUp';
import BlockSignIn from './components/BlockSignIn';
import BlockSignOut from './components/BlockSignOut';
import BlockCheckAuth from './components/BlockCheckAuth';

import BlockMessenger_Login from './components/BlockMessenger_Login';
import BlockMessenger_UserChats from './components/BlockMessenger_UserChats';
import BlockMessenger_CreateChat from './components/BlockMessenger_CreateChat';
import BlockMessenger_DeleteChat from './components/BlockMessenger_DeleteChat';
import BlockMessenger_InviteUser from './components/BlockMessenger_InviteUser';
import BlockMessenger_SendMessage from './components/BlockMessenger_SendMessage';
import BlockMessenger_ChatUsers from './components/BlockMessenger_ChatUsers';

import BlockResponse_Code from './components/BlockResponse_Code';

import {
  messengerWebsocketInitialize
} from './MessengerWS';

class App extends Component {

  state = {
    response_messenger: ''
  }

  componentWillMount() {
    this.messengetWS = messengerWebsocketInitialize(this.displayResponse);
  }

  displayResponse = (type, response) => {
    this.setState({
      ['response_' + type]: response
    });
  }

  render() {
    return (
      <div className="app">
        <SidebarLeft />

        <div className="main">
          <div className="uk-container uk-container-small uk-position-relative">

            <h1 className="uk-heading-divider">Messenger</h1>

            <BlockMessenger_Login
              ws_login={this.messengetWS.login}
              />

            <hr className="uk-divider uk-margin-large" />

            <BlockMessenger_UserChats
              ws_getUserChats={this.messengetWS.getUserChats}
              />

            <hr className="uk-divider uk-margin-large" />

            <BlockMessenger_CreateChat
              ws_createChat={this.messengetWS.createChat}
              />

            <hr className="uk-divider uk-margin-large" />

            <BlockMessenger_DeleteChat
              ws_deleteChat={this.messengetWS.deleteChat}
              />

            <hr className="uk-divider uk-margin-large" />

            <BlockMessenger_InviteUser
              ws_inviteUserToChat={this.messengetWS.inviteUserToChat}
              />

            <hr className="uk-divider uk-margin-large" />

            <BlockMessenger_SendMessage
              ws_sendMessage={this.messengetWS.sendMessage}
              />

            <hr className="uk-divider uk-margin-large" />

            <BlockMessenger_ChatUsers
              ws_getChatUsers={this.messengetWS.getChatUsers}
              />



            <h1 className="uk-heading-divider">Auth</h1>

            <BlockSignUp />

            <hr className="uk-divider uk-margin-large" />

            <BlockSignIn />

            <hr className="uk-divider uk-margin-large" />

            <BlockSignOut />

            <hr className="uk-divider uk-margin-large" />

            <BlockCheckAuth />

          </div>
        </div>
      </div>
    );
  }
}

export default App;

window.setCookie = function(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

window.getCookie = function(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

window.deleteCookie = function(name) {
  window.setCookie(name, "", {
    expires: -1
  })
}
