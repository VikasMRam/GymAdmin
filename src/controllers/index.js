import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';

import { set, unset } from 'sly/store/controller/actions';

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

export function connectController(parentMapStateToProps, parentDispatchToProps) {
  return function controllerCreator(WrappedComponent) {
    class Controller extends Component {
      static displayName = `WrappedController(${WrappedComponent.name || 'Controller'})`;
      render = () => <WrappedComponent {...this.props} />;
    }

    const rand = Math.floor(Math.random()*16777215).toString(16);
    const controllerKey = `${WrappedComponent.name}_${rand}`;

    const mapDispatchToProps = (dispatch, ownProps) => ({
      ...convertMapDispatchToObject(parentDispatchToProps)(dispatch, ownProps),
      set: (data) => dispatch(set({ data, controller: controllerKey })),
      unset: (key) => dispatch(unset({ key, controller: controllerKey })),
    });

    const mapStateToProps = (state, ownProps) => {
      return parentMapStateToProps(state, {
        ...ownProps,
        controller: get(state, ['controller', controllerKey]) || {},
      });
    };

    return connect(mapStateToProps, mapDispatchToProps)(Controller);
  }
}


