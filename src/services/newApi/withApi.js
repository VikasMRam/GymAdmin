import React, { Component } from 'react';
import { object } from 'prop-types';

export default (ChildComponent) => {
  return class WithApi extends Component {
    static displayName = ChildComponent.displayName || ChildComponent.name || 'WithApi';
    static contextTypes = { api: object };
    render = () => <ChildComponent api={this.context.api} {...this.props} />;
  };
};

