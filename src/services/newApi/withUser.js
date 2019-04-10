import React, { Component } from 'react';
import { connect } from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { object, func } from 'prop-types';

import { withApi, getRequestInfo } from 'sly/services/newApi';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

export default function withUser(InnerComponent) {
  const mapStateToProps = (state, props) => {
    if (props.userRequestInfo) {
      return {
        requestInfo: props.userRequestInfo,
      };
    }

    return {
      requestInfo: getRequestInfo(
        state,
        'getUser',
        [{ id: 'me' }],
      ),
    };
  };

  const mapDispatchToActions = (dispatch, { api }) => ({
    fetch: () => dispatch(api.getUser({ id: 'me' })),
  });

  @withApi

  @connect(mapStateToProps, mapDispatchToActions)

  class Wrapper extends React.Component {
    static displayName = `withUser(${getDisplayName(InnerComponent)})`;

    static WrappedComponent = InnerComponent;

    static propTypes = {
      api: object,
      requestInfo: object,
      fetch: func,
      done: func,
    };

    // props fetch bound to dispatch
    fetch = () => {
      const { fetch, done } = this.props;
      return fetch().then(done, done);
    };

    count = 0;

    render() {
      const { requestInfo, status, done, fetch, ...props } = this.props;
      const { normalized, ...request } = requestInfo;

      const innerProps = {
        ...props,
        user: normalized,
        status: {
          ...status,
          user: {
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
}
