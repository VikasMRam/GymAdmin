import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

import WSContext from 'sly/web/services/ws/WSContext';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

export default function withWS(InnerComponent) {
  class Wrapper extends React.Component {
    static displayName = `ws(${getDisplayName(InnerComponent)})`;

    static WrappedComponent = InnerComponent;

    render() {
      return (
        <WSContext.Consumer>
          {ws => <InnerComponent ws={ws} {...this.props} />}
        </WSContext.Consumer>
      );
    }
  }

  hoistNonReactStatic(Wrapper, InnerComponent);

  return Wrapper;
}
