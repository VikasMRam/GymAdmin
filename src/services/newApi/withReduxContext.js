import React, { useContext } from 'react';
import { ReactReduxContext } from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withReduxContext(Component) {
  function WithReduxContext(props) {
    const { store } = useContext(ReactReduxContext);
    return (
      <Component {...props} store={store} />
    );
  }

  WithReduxContext.displayName = `WithReduxContext(${getDisplayName(Component)})`;
  WithReduxContext.WrappedComponent = Component.WrappedComponent || Component;
  hoistNonReactStatic(WithReduxContext, Component);

  return WithReduxContext;
}
