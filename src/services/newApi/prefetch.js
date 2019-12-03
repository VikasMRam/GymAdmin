import React from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { isServer } from 'sly/config';
import { withApi } from 'sly/services/newApi';
import { createMemoizedRequestInfoSelector } from 'sly/services/newApi/selectors';
import withPrefetchWait from 'sly/services/newApi/withPrefetchWait';

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

      const requestInfo = getMemoizedRequestInfo(
        state,
        { call: apiCall, args: dispatcher(argumentsAbsorber, props) },
      );

      return {
        requestInfo,
      };
    };

    const mapDispatchToActions = (dispatch, { api }) => ({
      fetch: props => dispatch(dispatcher(api[apiCall], props)),
    });

    // FIXME: For now we have to continue using withDone (which uses componentWillUpdate)
    // we have to re-engineer this to be able to use react 17, or to start using hooks in
    // react 16.8 (methods renamed to UNSAFE_xxxx)
    // @withDone

    @withApi
    @withPrefetchWait
    @connect(mapStateToProps, mapDispatchToActions)

    class Wrapper extends React.PureComponent {
      static displayName = `prefetch(${getDisplayName(InnerComponent)}, ${propName})`;

      static WrappedComponent = InnerComponent;

      static propTypes = {
        api: object,
        requestInfo: object,
        fetch: func,
        prefetchWait: func,
        status: object,
      };

      constructor(props) {
        super(props);

        const { prefetchWait } = props;

        if (isServer) {
          prefetchWait(this.mayBeFetch());
        }
      }

      mayBeFetch = () => {
        const { requestInfo } = this.props;
        const { hasStarted, isLoading } = requestInfo;
        if (!isLoading && !hasStarted) {
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

      render() {
        const { requestInfo, status, ...props } = this.props;
        const { normalized, ...request } = requestInfo;

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
