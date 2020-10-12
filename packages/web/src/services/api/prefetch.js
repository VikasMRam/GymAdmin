import React from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { isServer } from 'sly/web/config';
import api from 'sly/web/services/api/apiInstance';
import { createMemoizedRequestInfoSelector } from 'sly/web/services/api/selectors';
import withPrefetchWait from 'sly/web/services/api/withPrefetchWait';
import withReduxContext from 'sly/web/services/api/withReduxContext';
import withApiContext, { apiContextPropType } from 'sly/web/services/api/context';
import { invalidateRequests } from 'sly/web/services/api/actions';

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

      // to be able to pass requestInfo for tests
      if (props[`${propName}RequestInfo`]) {
        return {
          requestInfo: props[`${propName}RequestInfo`],
        };
      }

      const args = dispatcher(argumentsAbsorber, props);
      const { placeholders = {} } = api[apiCall].method(...args);
      const requestInfo = getMemoizedRequestInfo(
        state,
        { call: apiCall, args: placeholders },
      );

      return {
        requestInfo,
      };
    };

    const fetch = (props, config) => dispatcher(
      placeholders => api[apiCall].asAction(placeholders, config),
      props,
    );

    const invalidate = props => dispatcher(
      placeholders => invalidateRequests(apiCall, placeholders),
      props,
    );

    @withApiContext
    @withReduxContext
    @withPrefetchWait
    @connect(mapStateToProps, { fetch, invalidate })

    class Wrapper extends React.PureComponent {
      static displayName = `prefetch(${getDisplayName(InnerComponent)}, ${propName})`;

      static WrappedComponent = InnerComponent;

      static propTypes = {
        api: object,
        requestInfo: object,
        invalidate: func,
        fetch: func,
        prefetchWait: func,
        status: object,
        apiContext: apiContextPropType,
      };

      constructor(props, context) {
        super(props, context);

        if (isServer) {
          props.prefetchWait(this.mayBeFetch());
        }
      }

      mayBeFetch = () => {
        const { requestInfo, apiContext } = this.props;
        const { hasStarted, isLoading, isInvalid } = requestInfo;
        const shouldSkip = isServer && (apiContext.skipApiCalls || api[apiCall].ssrIgnore);
        if (isInvalid || (!shouldSkip && !isLoading && !hasStarted)) {
          return this.fetch();
        }
        return false;
      };

      componentDidMount = this.mayBeFetch;

      componentDidUpdate = this.mayBeFetch;

      // props fetch bound to dispatch
      fetch = () => {
        const { fetch } = this.props;
        return fetch(this.props);
      };

      invalidate = () => {
        const { invalidate } = this.props;
        return invalidate(this.props);
      }

      render() {
        const { requestInfo: request, status, ...props } = this.props;

        const innerProps = {
          ...props,
          [propName]: request.normalized,
          status: {
            ...status,
            [propName]: {
              ...request,
              refetch: this.fetch,
              invalidate: this.invalidate,
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
