import React, { Component } from 'react';
import { connect } from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { object, func } from 'prop-types';

import { withApi, getRequestInfo, getRelationship } from 'sly/services/newApi';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

export default function withUser(InnerComponent) {
  const mapStateToProps = (state, props) => {
    const userRequestInfo = props.userRequestInfo || getRequestInfo(
      state,
      'getUser',
      [{ id: 'me' }],
    );

    const uuidAuxRequestInfo = props.uuidAuxRequestInfo || getRequestInfo(
      state,
      'getUuidAux',
      [{ id: 'me' }],
    );

    return {
      userRequestInfo,
      uuidAuxRequestInfo,
    };
  };

  const mapDispatchToActions = (dispatch, { api }) => ({
    fetchUser: () => dispatch(api.getUser({ id: 'me' })),
    fetchUuidAux: () => dispatch(api.getUuidAux({ id: 'me' })),
  });

  @withApi

  @connect(mapStateToProps, mapDispatchToActions)

  class Wrapper extends React.Component {
    static displayName = `withUser(${getDisplayName(InnerComponent)})`;

    static WrappedComponent = InnerComponent;

    static propTypes = {
      api: object,
      userRequestInfo: object,
      uuidAuxRequestInfo: object,
      fetchUser: func,
      fetchUuidAux: func,
      done: func,
    };

    // props fetch bound to dispatch
    fetchUser = () => {
      const { fetchUser, done } = this.props;
      return fetchUser().then(done, done);
    };

    fetchUuidAux = () => {
      const { fetchUuidAux, done } = this.props;
      return fetchUuidAux().then(done, done);
    };

    count = 0;

    render() {
      const { userRequestInfo, uuidAuxRequestInfo, status, done, fetch, ...props } = this.props;

      const { normalized: user, ...userRequest } = userRequestInfo;
      const { normalized: uuidAux, ...uuidAuxRequest } = uuidAuxRequestInfo;

      const innerProps = {
        ...props,

        user,
        uuidAux,

        status: {
          ...status,

          user: {
            ...userRequest,
            refetch: this.fetchUser,
          },

          uuidAux: {
            ...uuidAuxRequest,
            refetch: this.fetchUuidAux,
          },
        },
      };

      return <InnerComponent {...innerProps} />;
    }
  }

  hoistNonReactStatic(Wrapper, InnerComponent);

  return Wrapper;
}
