import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SidebarLeft from './SidebarLeft';
import BlockSignUp from './components/BlockSignUp';
import BlockSignIn from './components/BlockSignIn';
import BlockSignOut from './components/BlockSignOut';
import BlockCheckAuth from './components/BlockCheckAuth';

import BlockUserChats from './components/BlockUserChats';
import BlockCreateChat from './components/BlockCreateChat';
import BlockDeleteChat from './components/BlockDeleteChat';
import BlockInviteUser from './components/BlockInviteUser';
import BlockSendMessage from './components/BlockSendMessage';
import BlockChatUsers from './components/BlockChatUsers';

class App extends Component {



  render() {
    return (
      <div className="app">
        <SidebarLeft />

        <div className="main">
          <div className="uk-container uk-container-small uk-position-relative">

            <h1 className="uk-heading-divider">Messenger</h1>

            <BlockUserChats />

            <hr className="uk-divider uk-margin-large" />

            <BlockCreateChat />

            <hr className="uk-divider uk-margin-large" />

            <BlockDeleteChat />

            <hr className="uk-divider uk-margin-large" />

            <BlockInviteUser />

            <hr className="uk-divider uk-margin-large" />

            <BlockSendMessage />

            <hr className="uk-divider uk-margin-large" />

            <BlockChatUsers />



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
