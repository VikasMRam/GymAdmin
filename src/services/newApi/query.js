import React from 'react';
import { object, func } from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';

import api from 'sly/services/newApi/apiInstance';

const defaultDispatcher = (call, props, ...args) => call(...args);

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

export default function query(propName, apiCall, dispatcher = defaultDispatcher) {
  return (InnerComponent) => {
    const makeApiCall = call => (...args) => {
      if (['get', 'destroy'].includes(call.method)) {
        return call(...args);
      }

      const placeholders = args.length >= 2 ? args[0] : {};
      const data = args.length >= 2 ? args[1] : args[0];
      const options = args.length === 3 ? args[2] : {};

      return call(placeholders, { data }, options);
    };

    const fetch = (props, ...args) => dispatcher(makeApiCall(api[apiCall]), props, ...args);

    class Wrapper extends React.Component {
      static displayName = `query(${getDisplayName(InnerComponent)}, ${propName})`;

      static propTypes = {
        api: object.isRequired,
        fetch: func.isRequired,
      };

      static WrappedComponent = InnerComponent;

      // props fetch bound to dispatch
      fetch = (...args) => {
        return fetch(this.props, ...args);
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
