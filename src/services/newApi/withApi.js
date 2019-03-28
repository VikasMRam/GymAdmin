import React from 'react';
import { object } from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';

export default function withApi(ChildComponent) {
  const WithApi = (props, context) => <ChildComponent api={props.api || context.api} {...props} />;

  WithApi.displayName = `WithApi(${ChildComponent.displayName || ChildComponent.name || 'WithApi'})`;
  WithApi.contextTypes = { api: object };
  WithApi.propTypes = { api: object };
  WithApi.WrappedComponent = ChildComponent;

  hoistNonReactStatic(WithApi, ChildComponent);

  return WithApi;
}

