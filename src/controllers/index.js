import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { randomHexNumber } from 'sly/services/helpers/utils';
import { set, unset, reset } from 'sly/store/controller/actions';

// TODO: tests
export function connectController(parentMapStateToProps, parentDispatchToProps) {
  if (typeof parentDispatchToProps === 'function' && parentDispatchToProps.length > 1) {
    throw new Error('dispatchToProps should not use ownProps');
  }

  return function controllerCreator(WrappedComponent) {
    const Controller = props => <WrappedComponent {...props} />;
    Controller.displayName = `WrappedController(${WrappedComponent.name || 'Controller'})`;
    const generatedControllerKey = `${WrappedComponent.name}_${randomHexNumber()}`;

    const mapDispatchToProps = { ...parentDispatchToProps, set, unset, reset };

    const mapStateToProps = (state, ownProps) => {
      const controllerKey = ownProps.controllerKey || generatedControllerKey;
      const controller = get(state, ['controller', controllerKey]) || {};
      const props = {
        ...ownProps,
        controllerKey,
        controller,
      };
      return {
        ...props,
        ...parentMapStateToProps(state, {
          ...props,
        }),
      };
    };

    const ConnectedController = connect(mapStateToProps, mapDispatchToProps)(props => (
      <Controller
        {...props}
        set={data => props.set({ data, controller: props.controllerKey })}
        unset={key => props.unset({ key, controller: props.controllerKey })}
        resetController={() => props.reset({ controller: props.controllerKey })}
      />
    ));

    hoistNonReactStatic(ConnectedController, WrappedComponent);

    if (typeof ConnectedController.WrappedComponent === 'undefined') {
      ConnectedController.WrappedComponent = WrappedComponent;
    }

    return ConnectedController;
  };
}
