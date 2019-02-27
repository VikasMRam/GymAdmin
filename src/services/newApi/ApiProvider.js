import { Component } from 'react';
import { object, any } from 'prop-types';

export default class ApiProvider extends Component {
  static propTypes = {
    api: object.isRequired,
    children: any,
  };

  static childContextTypes = {
    api: object.isRequired,
  };

  getChildContext = () => ({
    api: this.props.api,
  });

  render = () => this.props.children;
}
