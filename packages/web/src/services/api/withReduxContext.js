import React, { useContext } from 'react';
import { ReactReduxContext } from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { object } from 'prop-types';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withReduxContext(Component) {
  function WithReduxContext(props) {
    const reduxContext = useContext(ReactReduxContext);
    const { store } = reduxContext || props;
    return (
      <Component {...props} store={store} />
    );
  }

  WithReduxContext.propTypes = {
    store: object,
  };

  WithReduxContext.displayName = `WithReduxContext(${getDisplayName(Component)})`;
  WithReduxContext.WrappedComponent = Component.WrappedComponent || Component;
  hoistNonReactStatic(WithReduxContext, Component);

  return WithReduxContext;
}
