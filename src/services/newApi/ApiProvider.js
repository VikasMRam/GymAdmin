import { Component } from 'react';
import { object, any, func } from 'prop-types';
import { connect } from 'react-redux';

@connect()

export default class ApiProvider extends Component {
  static propTypes = {
    api: object.isRequired,
    children: any,
    dispatch: func.isRequired,
  };

  static childContextTypes = {
    api: object.isRequired,
  };

  getChildContext = () => ({
    api: this.bindApi(),
  });

  bindApi = () => {
    const { api, dispatch } = this.props;
    return Object.entries(api).reduce((acc, [key, method]) => {
      acc[key] = (...args) => dispatch(method(...args));
      acc[key].actionName = method.actionName;
      acc[key].method = method.method;
      return acc;
    }, {});
  };

  render = () => this.props.children;
}
