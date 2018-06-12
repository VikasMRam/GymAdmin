import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';

export function connectController(controllerKey, mapStateToProps, mapDispatchToProps) {
  return function controllerCreator(WrappedComponent) {
    class Controller extends Component {
      render = () => <WrappedComponent {...this.props } />;
    }
    return connect((state, ownProps) => mapStateToProps(state, {
      ...ownProps,
      [controllerKey]: get(state, ['controller', controllerKey]) || {},
    }), mapDispatchToProps)(Controller);
  }
}


