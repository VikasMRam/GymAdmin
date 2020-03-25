import { arrayOf, object, shape, bool } from 'prop-types';
import React, { useContext } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { isServer } from 'sly/config';

export const apiContextPropType = shape({
  promises: arrayOf(object),
  skipApiCalls: bool,
});

export const ApiContext = React.createContext(null);

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withApiContext(Component) {
  function WithApiContext(props) {
    const apiContext = isServer ? useContext(ApiContext) : null;
    return (
      <Component {...props} apiContext={apiContext} />
    );
  }

  WithApiContext.displayName = `WithApiContext(${getDisplayName(Component)})`;
  WithApiContext.WrappedComponent = Component.WrappedComponent || Component;
  hoistNonReactStatic(WithApiContext, Component);

  return WithApiContext;
}

