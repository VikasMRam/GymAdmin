import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { randomHexNumber } from 'sly/services/helpers/utils';
import { set, unset, reset } from 'sly/store/controller/actions';

const convertMapDispatchToObject = mapDispatchToProps => (dispatch, props) => {
  if (!mapDispatchToProps) {
    return {};
  }

  return typeof mapDispatchToProps === 'function'
    ? mapDispatchToProps(dispatch, props)
    : Object.keys(mapDispatchToProps)
      .reduce((cumul, key) => {
        cumul[key] = (...args) => dispatch(mapDispatchToProps[key](...args));
        return cumul;
      }, {});
};

// TODO: tests
export function connectController(parentMapStateToProps, parentDispatchToProps) {
  return function controllerCreator(WrappedComponent) {
    const rand = randomHexNumber();
    const Controller = props => <WrappedComponent {...props} />;
    Controller.displayName = `WrappedController(${WrappedComponent.name || 'Controller'})`;
    const controllerKey = `${WrappedComponent.name}_${rand}`;

    const mapDispatchToProps = (dispatch, ownProps) => ({
      ...convertMapDispatchToObject(parentDispatchToProps)(dispatch, ownProps),
      get: () => dispatch((dispatch, getState) => get(getState(), ['controller', ownProps.controllerKey || controllerKey])),
      set: data => dispatch(set({ data, controller: ownProps.controllerKey || controllerKey })),
      unset: key => dispatch(unset({ key, controller: ownProps.controllerKey || controllerKey })),
      resetController: () => dispatch(reset({ controller: ownProps.controllerKey || controllerKey })),
    });

    const mapStateToProps = (state, ownProps) => {
      return parentMapStateToProps(state, {
        ...ownProps,
        controller: get(state, ['controller', ownProps.controllerKey || controllerKey]) || {},
      });
    };

    const ConnectedController = connect(mapStateToProps, mapDispatchToProps)(Controller);

    hoistNonReactStatic(ConnectedController, WrappedComponent);

    if (typeof ConnectedController.WrappedComponent === 'undefined') {
      ConnectedController.WrappedComponent = WrappedComponent;
    }

    return ConnectedController;
  };
}
