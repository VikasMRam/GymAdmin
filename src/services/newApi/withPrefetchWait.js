import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { object } from 'prop-types';

import { apiContextPropType } from './context';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
// FIXME: we have to move to new context api

export default function withPrefetchWait(Component) {
  class WithPrefetchWait extends React.Component {
    static contextTypes = {
      apiContext: apiContextPropType,
      apiConfig: object,
    };

    static displayName = `WithPrefetchWait(${getDisplayName(Component)})`;
    static WrappedComponent = Component;

    prefetchWait = (promise) => {
      if (promise) {
        this.context.apiContext.promises.push(promise);
      }
    };

    render() {
      const { apiConfig } = this.context;

      return (
        <Component
          apiConfig={apiConfig}
          prefetchWait={this.prefetchWait}
          {...this.props }
        />
      );
    }
  }

  // FIXME: hoistNon... broken due to misuse of isReact.isMemo
  // hoistNonReactStatic(WithPrefetchWait, Component);

  return WithPrefetchWait;
}
