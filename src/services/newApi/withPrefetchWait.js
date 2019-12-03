import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { apiContextPropType } from './context';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
// FIXME: when upgrading react, this hack for react 16.3 that can't read
//  `static contextType` from ssr, we have to move to new context api

export default function withPrefetchWait(Component) {
  class WithPrefetchWait extends React.Component {
    static contextTypes = {
      apiContext: apiContextPropType,
    };

    static displayName = `WithPrefetchWait(${getDisplayName(Component)})`;
    static WrappedComponent = Component;

    prefetchWait = (promise) => {
      if (promise) {
        this.context.apiContext.promises.push(promise);
      }
    };

    render() {
      return <Component prefetchWait={this.prefetchWait} {...this.props } />;
    }
  }

  hoistNonReactStatic(WithPrefetchWait, Component);

  return WithPrefetchWait;
}
