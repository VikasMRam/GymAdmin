import { Component } from 'react';
import { string, node, func } from 'prop-types';

export default class Variant extends Component {
  static propTypes = {
    name: string.isRequired,
    children: node,
    onView: func,
  };

  static defaultProps = {
    children: null,
  };

  componentDidMount() {
    const { onView } = this.props;

    if (onView) {
      onView();
    }
  }

  render() {
    return this.props.children;
  }
}
