import { Component } from 'react';
import { string, node } from 'prop-types';

export default class Variant extends Component {
  static propTypes = {
    name: string.isRequired,
    children: node,
  };

  render() {
    return this.props.children;
  }
}
