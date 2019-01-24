import React, { Component } from 'react';

export default class BlockResponse_Code extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <code>
        {this.props.response}
      </code>
    );
  }
}
