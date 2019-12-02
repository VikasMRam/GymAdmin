import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { destroy, get } from 'sly/services/newApi/httpMethods';
import api from 'sly/services/newApi/apiInstance';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

export default function query(propName, apiCall) {
  return (InnerComponent) => {
    class Wrapper extends React.Component {
      static displayName = `query(${getDisplayName(InnerComponent)}, ${propName})`;
      static WrappedComponent = InnerComponent.WrappedComponent || InnerComponent;

      // props fetch not bound to dispatch
      // FIXME: dispatch posts and patches, dispatch invalidate for delete
      fetch = (...args) => {
        const call = api[apiCall];

        if ([destroy, get].contains(call.method)) {
          return call(...args);
        }

        const placeholders = args.length >= 2 ? args[0] : {};
        const data = args.length >= 2 ? args[1] : args[0];
        const options = args.length === 3 ? args[2] : {};

        return call(placeholders, { data }, options);
      };

      render() {
        const { ...props } = this.props;

        const innerProps = {
          ...props,
          [propName]: this.fetch,
        };

        return <InnerComponent {...innerProps} />;
      }
    }

    hoistNonReactStatic(Wrapper, InnerComponent);

    return Wrapper;
  };
}
