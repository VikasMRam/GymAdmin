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

  bindApi = () => {
    const { api, dispatch } = this.props;
  }

  getChildContext = () => ({
    api: this.bindApi(),
  });

  render = () => this.props.children;
}
