import React from 'react';
import get from 'lodash/get';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { useApi } from 'sly/web/services/api/context';

import { randomHexNumber } from 'sly/web/services/helpers/utils';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

export default function connectApi(parentMapStateToProps, mapDispatchToProps = {}) {
  if (typeof mapDispatchToProps === 'function' && mapDispatchToProps.length > 1) {
    throw new Error('dispatchToProps should not use ownProps');
  }

  return function connectApiCreator(WrappedComponent) {
    const generatedControllerKey = `${WrappedComponent.name}_${randomHexNumber()}`;

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

    const Wrapper = (props) => {
      const { store, dispatch } = useApi();
      const stateProps = mapStateToProps(store.getState(), props);
      const dispatchProps = typeof mapDispatchToProps === 'function'
        ? mapDispatchToProps(dispatch)
        : Object.entries(mapDispatchToProps)
          .reduce((acc, [key, val]) => {
            acc[key] = (...args) => dispatch(val(...args));
            return acc;
          }, []);
      return (
        <WrappedComponent
          {...stateProps}
          {...dispatchProps}
        />
      );
    }

    Wrapper.displayName = `controller(${getDisplayName(WrappedComponent)})`;
    Wrapper.WrappedComponent = WrappedComponent.WrappedComponent || WrappedComponent;
    hoistNonReactStatic(Wrapper, WrappedComponent);

    return Wrapper;
  };
}
