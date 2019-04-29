import React, { Component } from 'react';
import { connect } from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { object, func } from 'prop-types';
import get from 'lodash/get';

import { query, withApi, getRequestInfo, getEntity, getRelationship } from 'sly/services/newApi';

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

    const contactRaw = userRequestInfo.result && getRelationship(state, userRequestInfo.result, 'contact');

    return {
      contactRaw,
      userRequestInfo,
      uuidAuxRequestInfo,
    };
  };

  const mapDispatchToActions = (dispatch, { api }) => ({
    fetchUser: () => dispatch(api.getUser({ id: 'me' })),
    fetchUuidAux: () => dispatch(api.getUuidAux({ id: 'me' })),
  });

  @withApi

  @query('updateUser', 'updateUser')

  @connect(mapStateToProps, mapDispatchToActions)

  class Wrapper extends React.Component {
    static displayName = `withUser(${getDisplayName(InnerComponent)})`;

    static WrappedComponent = InnerComponent;

    static propTypes = {
      api: object,
      contact: object,
      contactRaw: object,
      userRequestInfo: object,
      uuidAuxRequestInfo: object,
      fetchUser: func,
      fetchUuidAux: func,
      status: object,
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

    userHas = (fields) => {
      const { userRequestInfo } = this.props;
      if (!userRequestInfo.normalized) return false;
      return !fields.some(field => !get(userRequestInfo.normalized, field, false));
    };

    count = 0;

    render() {
      const {
        userRequestInfo,
        uuidAuxRequestInfo,
        status,
        done,
        fetchUser,
        fetchUuidAux,
        ...props
      } = this.props;

      const { normalized: user, ...userRequest } = userRequestInfo;
      const { normalized: uuidAux, ...uuidAuxRequest } = uuidAuxRequestInfo;

      const innerProps = {
        ...props,

        user,
        uuidAux,
        userHas: this.userHas,

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
