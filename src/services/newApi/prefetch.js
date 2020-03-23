import React from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { isServer } from 'sly/config';
import api from 'sly/services/newApi/apiInstance';
import { createMemoizedRequestInfoSelector } from 'sly/services/newApi/selectors';
import withPrefetchWait from 'sly/services/newApi/withPrefetchWait';
import withReduxContext from 'sly/services/newApi/withReduxContext';

const defaultDispatcher = call => call();

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
      || WrappedComponent.name
      || 'Component';
}

export default function prefetch(propName, apiCall, dispatcher = defaultDispatcher) {
  return (InnerComponent) => {
    const getMemoizedRequestInfo = createMemoizedRequestInfoSelector();

    const mapStateToProps = (state, props) => {
      const argumentsAbsorber = (...args) => args;

      const { getState } = props.store;

      // to be able to pass requestInfo for tests
      if (props[`${propName}RequestInfo`]) {
        return {
          requestInfo: props[`${propName}RequestInfo`],
        };
      }

      const args = dispatcher(argumentsAbsorber, props);
      const { placeholders = {} } = api[apiCall].method(...args);

      const getRequestInfo = () => getMemoizedRequestInfo(
        getState(),
        { call: apiCall, args: placeholders },
      );

      return {
        requestInfo: getRequestInfo(),
        getRequestInfo,
      };
    };

    const fetch = (props, config) => dispatcher(
      placeholders => api[apiCall].asAction(placeholders, config),
      props,
    );

    @withReduxContext
    @withPrefetchWait
    @connect(mapStateToProps, { fetch })

    class Wrapper extends React.PureComponent {
      static displayName = `prefetch(${getDisplayName(InnerComponent)}, ${propName})`;

      static WrappedComponent = InnerComponent;

      static propTypes = {
        api: object,
        requestInfo: object,
        getRequestInfo: func,
        fetch: func,
        prefetchWait: func,
        apiConfig: object,
        status: object,
      };

      // necessary because we configure the request options
      // in the server with the credentials taken from the
      // ssr request
      static defaultProps = {
        apiConfig: {},
      };

      constructor(props) {
        super(props);

        if (isServer) {
          props.prefetchWait(this.mayBeFetch());
        }
      }

      mayBeFetch = () => {
        const { getRequestInfo } = this.props;
        const { hasStarted, isLoading } = getRequestInfo();
        const shouldSkip = isServer && api[apiCall].ssrIgnore;
        if (!shouldSkip && !isLoading && !hasStarted) {
          return this.fetch();
        }
        return false;
      };

      componentDidMount = this.mayBeFetch;

      componentDidUpdate = this.mayBeFetch;

      // props fetch bound to dispatch
      fetch = () => {
        const { fetch, apiConfig } = this.props;
        return fetch(this.props, apiConfig);
      };

      render() {
        const { getRequestInfo, status, ...props } = this.props;
        const { normalized, ...request } = getRequestInfo();

        const innerProps = {
          ...props,
          [propName]: normalized,
          status: {
            ...status,
            [propName]: {
              ...request,
              refetch: this.fetch,
            },
          },
        };

        return <InnerComponent {...innerProps} />;
      }
    }

    hoistNonReactStatic(Wrapper, InnerComponent);

    return Wrapper;
  };
}
