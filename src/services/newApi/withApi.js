import React from 'react';
import { object } from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';

import createApi from './createApi';

const beesApi = createApi();

export default function withApi(ChildComponent) {
  const WithApi = props => <ChildComponent api={beesApi} {...props} />;

  WithApi.displayName = `WithApi(${ChildComponent.displayName || ChildComponent.name || 'WithApi'})`;
  WithApi.propTypes = { api: object };
  WithApi.WrappedComponent = ChildComponent;

  hoistNonReactStatic(WithApi, ChildComponent);

  return WithApi;
}

