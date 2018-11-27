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
          <li className="uk-nav-header">Menu</li>
          <li><a href="#block-sign-up">Sign Up</a></li>
          <li><a href="#block-sign-in">Sign In</a></li>
          <li><a href="#block-sign-out">Sign Out</a></li>
          <li><a href="#block-check-auth">Check Auth</a></li>
          <li></li>
        </ul>
      </div>
    );
  }
}
