import { Component } from 'react';
import { object, any } from 'prop-types';
import { connect } from 'react-redux';

class ApiProvider extends Component {
  static propTypes = {
    api: object.isRequired,
    children: any,
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
      return acc;
    }, {});
  };

  render = () => this.props.children;
}

export default connect()(ApiProvider);
