import { Component } from 'react';
import { object, any } from 'prop-types';

import { API_CALL } from './constants';

export const makeApiCall = (call, args) => ({
  type: API_CALL,
  payload: { call, args },
});

export default class ApiProvider extends Component {
  static propTypes = {
    api: object.isRequired,
    children: any,
  };

  static childContextTypes = {
    api: object.isRequired,
  };

  getChildContext = () => ({
    api: this.createApiActions(),
  });

  createApiActions = () => Object.entries(this.props.api)
    .reduce((acc, [name, call]) => {
      acc[name] = (...args) => makeApiCall(call, args);
      acc[name].actionName = call.actionName;
      acc[name].method = call.method;
      acc[name].call = call;
      return acc;
    }, {});

  render = () => this.props.children;
}
