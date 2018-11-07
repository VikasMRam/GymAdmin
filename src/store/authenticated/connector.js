import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ensureAuthenticated, trackAuthenticated } from 'sly/store/actions';

export default function authenticated() {
  return function authenticatedComponent(ChildComponent) {
    return connect()(
      class Authenticated extends Component {
        render() {
          const props = {
            ...this.props,
            ensureAuthenticated,
            trackAuthenticated,
          };
          return <ChildComponent {...props} />;
        }
      }
    );
  };
}
