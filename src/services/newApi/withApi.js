import React from 'react';
import { object } from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

export default function withApi(ChildComponent) {
  const WithApi = (props, context) => <ChildComponent api={context.api} {...props} />;

  WithApi.contextTypes = { api: object };
  WithApi.displayName = `WithApi(${getDisplayName(ChildComponent)})`;
  WithApi.WrappedComponent = ChildComponent;

  hoistNonReactStatic(WithApi, ChildComponent);

  return WithApi;
}

