import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { apiContextPropType } from './context';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withPrefetchWait(Component) {
  class WithPrefetchWait extends React.Component {
    static displayName = `WithPrefetchWait(${getDisplayName(Component)})`;
    static WrappedComponent = Component;

    static propTypes = {
      apiContext: apiContextPropType,
    };

    prefetchWait = (promise) => {
      const { apiContext } = this.props;
      if (promise) {
        apiContext.promises.push(promise);
      }
    };

    render() {
      const { apiConfig } = this.context;

      return (
        <Component
          apiConfig={apiConfig}
          prefetchWait={this.prefetchWait}
          {...this.props}
        />
      );
    }
  }

  hoistNonReactStatic(WithPrefetchWait, Component);

  return WithPrefetchWait;
}
