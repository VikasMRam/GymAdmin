import React from 'react';
import { connect } from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { object, func } from 'prop-types';
import get from 'lodash/get';

import api from 'sly/services/newApi/apiInstance';
import { query, createMemoizedRequestInfoSelector } from 'sly/services/newApi';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

const getMemoizedUserRequestInfo = createMemoizedRequestInfoSelector();
const getMemoizedUuidAuxRequestInfo = createMemoizedRequestInfoSelector();
export default function withUser(InnerComponent) {
  const makeMapStateToProps = () => {
    return (state, props) => {
      // let this rescue this from props to bypass store for testing porpuses
      const userRequestInfo = props.userRequestInfo || getMemoizedUserRequestInfo(
        state,
        { call: 'getUser', args: { id: 'me' } }
      );

      const uuidAuxRequestInfo = props.uuidAuxRequestInfo || getMemoizedUuidAuxRequestInfo(
        state,
        { call: 'getUuidAux', args: { id: 'me' } }
      );

      return {
        userRequestInfo,
        uuidAuxRequestInfo,
      };
    };
  };

  const mapDispatchToActions = {
    fetchUser: () => api.getUser.asAction({ id: 'me' }),
    fetchUuidAux: () => api.getUuidAux.asAction({ id: 'me' }),
  };

  @query('updateUser', 'updateUser')
  @connect(makeMapStateToProps, mapDispatchToActions)

  class Wrapper extends React.PureComponent {
    static displayName = `withUser(${getDisplayName(InnerComponent)})`;

    static WrappedComponent = InnerComponent;

    static propTypes = {
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

  // hoistNonReactStatic(Wrapper, InnerComponent);

  return Wrapper;
}
