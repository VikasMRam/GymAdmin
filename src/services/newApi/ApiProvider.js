import { Component } from 'react';
import { object, any } from 'prop-types';

export default class ApiProvider extends Component {
  static propTypes = {
    apiConfig: object.isRequired,
    children: any,
  };

  static childContextTypes = {
    apiConfig: object.isRequired,
  };

  getChildContext = () => ({
    apiConfig: this.props.apiConfig,
  });

  render = () => this.props.children;
}
