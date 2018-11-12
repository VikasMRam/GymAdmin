import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ensureAuthenticated, trackAuthenticated } from 'sly/store/actions';

export default function authenticated() {
  return function authenticatedComponent(ChildComponent) {
    class Authenticated extends Component {
      static displayName = `Authenticated(${ChildComponent.name || 'Authenticated'})`;

      render() {
        return <ChildComponent {...this.props} />;
      }
    }

    const mapStateToProps = (state, ownProps) => ({

    });

    const mapDispatchToProps = (dispatch, ownProps) => ({
      ensureAuthenticated: data => dispatch(ensureAuthenticated(data)),
      trackAuthenticated: data => dispatch(trackAuthenticated(data)),
    });

    return connect(mapStateToProps, mapDispatchToProps)(Authenticated);
  };
}
