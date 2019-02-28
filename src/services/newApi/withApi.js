import React from 'react';
import { object } from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';
import produce from 'immer';

export default (ChildComponent) => {
  const WithApi = (props, context) => <ChildComponent api={context.api} {...props} />;

  WithApi.displayName = `WithApi(${ChildComponent.displayName || ChildComponent.name || 'WithApi'})`;
  WithApi.contextTypes = { api: object };

  hoistNonReactStatic(WithApi, ChildComponent);

  return WithApi;
};

