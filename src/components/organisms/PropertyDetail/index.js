import React, { Component } from 'react';

export default class PropertyDetail extends Component {
  render() {
    const { name } = this.props;
    return <div>{name}</div>;
  }
}
