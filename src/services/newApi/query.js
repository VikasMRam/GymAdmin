import React from 'react';
import { connect } from 'react-redux';
import { object } from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { isServer } from 'sly/config';
import { withApi, getRequestInfo } from 'sly/services/newApi';

const defaultDispatcher = (call, args) => call(args);

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

export default function query(propName, apiCall, dispatcher = defaultDispatcher) {
  return (InnerComponent) => {
    const mapStateToProps = (state, props) => {
      const argumentsAbsorber = (...args) => args;

      if (props[`${propName}RequestInfo`]) {
        return {
          request: props[`${propName}RequestInfo`],
        };
      }

      return {
        request: getRequestInfo(
          state,
          props.api[apiCall],
          dispatcher(argumentsAbsorber, props),
        ),
      };
    };

    const mapDispatchToActions = (dispatch, { api }) => ({
      fetch: (args, props) => dispatch(dispatcher(api[apiCall], args, props)),
    });

    @withApi

    @connect(mapStateToProps, mapDispatchToActions)

    class Wrapper extends React.Component {
      static displayName = `query(${getDisplayName(InnerComponent)}, ${propName})`;

      static propTypes = {
        api: object,
        request: object,
        status: object,
      };

      componentWillMount() {
        const { requestInfo, done } = this.props;
        if (!requestInfo.isLoading && !requestInfo.hasStarted) {
          this.fetch();
        } else if (isServer) {
          done();
        }
      }

      componentWillReceiveProps(nextProps) {
        const { requestInfo } = nextProps;
        if (!requestInfo.isLoading && !requestInfo.hasStarted) {
          this.fetch(nextProps);
        }
      }

      // this apiCall is done from the api provided by ApiProvider, so it's bound to dispatch
      fetch = (args) => {
        return this.props.fetch(args, this.props);
      };

      render() {
        const { request, status } = this.props;

        if (isServer && (!request.hasStarted || request.isLoading)) {
          return null;
        }

        const innerProps = {
          [propName]: this.call,
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
