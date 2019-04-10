import React from 'react';
import { connect } from 'react-redux';
import { object } from 'prop-types';
import { withDone } from 'react-router-server';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { isServer } from 'sly/config';
import { withApi, getRequestInfo } from 'sly/services/newApi';

const defaultDispatcher = call => call();

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
      || WrappedComponent.name
      || 'Component';
}

export default function prefetch(propName, apiCall, dispatcher = defaultDispatcher) {
  return (InnerComponent) => {
    const mapStateToProps = (state, props) => {
      const argumentsAbsorber = (...args) => args;

      if (props[`${propName}RequestInfo`]) {
        return {
          requestInfo: props[`${propName}RequestInfo`],
        };
      }

      return {
        requestInfo: getRequestInfo(
          state,
          apiCall,
          dispatcher(argumentsAbsorber, props),
        ),
        done: (...args) => {
          console.log('calling done', getDisplayName(InnerComponent));
          props.done(...args);
        },
      };
    };

    const mapDispatchToActions = (dispatch, { api }) => ({
      fetch: props => dispatch(dispatcher(api[apiCall], props)),
    });

    @withApi

    // FIXME: For now we have to continue using withDone (which uses componentWillUpdate)
    // we have to re-engineer this to be able to use react 17, or to start using hooks in
    // react 16.8 (methods renamed to UNSAFE_xxxx)
    @withDone
    @connect(mapStateToProps, mapDispatchToActions)

    class Wrapper extends React.Component {
      static displayName = `prefetch(${getDisplayName(InnerComponent)}, ${propName})`;

      static WrappedComponent = InnerComponent;

      static propTypes = {
        api: object,
        requestInfo: object,
        status: object,
      };

      componentDidMount() {
        this.props.done();
      }

      componentWillMount() {
        const { requestInfo, done } = this.props;
        const { hasStarted, isLoading } = requestInfo;
        if (!isLoading && !hasStarted) {
          this.fetch();
        } else if (isServer && hasStarted && !isLoading) {
          done();
        }
      }

      componentWillReceiveProps(nextProps) {
        const { requestInfo, done } = nextProps;
        const { hasStarted, isLoading } = requestInfo;
        if (!isLoading && !hasStarted) {
          this.fetch(nextProps);
        } else if (isServer && hasStarted && !isLoading) {
          done();
        }
      }

      // props fetch bound to dispatch
      fetch = (props = this.props) => {
        const { fetch, done } = props;
        console.log('fetching', apiCall);
        return fetch(props).then(done, done);
      };

      render() {
        const { requestInfo, status, done, fetch, ...props } = this.props;
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
