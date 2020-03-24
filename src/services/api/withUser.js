import React from 'react';
import { object, func } from 'prop-types';
import get from 'lodash/get';
import hoistNonReactStatics from 'hoist-non-react-statics';

import userPropType, { uuidAux as uuidAuxPropType } from 'sly/propTypes/user';
import { query } from 'sly/services/api';
import prefetch from 'sly/services/api/prefetch';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

export default function withUser(InnerComponent) {
  @prefetch('user', 'getUser', req => req({ id: 'me' }))
  @prefetch('uuidAux', 'getUuidAux', req => req({ id: 'me' }))
  @query('updateUser', 'updateUser')
  class Wrapper extends React.PureComponent {
    static displayName = `withUser(${getDisplayName(InnerComponent)})`;

    static WrappedComponent = InnerComponent;

    static propTypes = {
      user: userPropType,
      uuidAux: uuidAuxPropType,
      status: object,
    };

    userHas = (fields) => {
      const { status } = this.props;
      if (!status.user.normalized) return false;
      return !fields.some(field => !get(status.user.normalized, field, false));
    };

    count = 0;

    render() {
      const {
        status,
        user,
        uuidAux,
        ...props
      } = this.props;

      const innerProps = {
        ...props,

        user,
        uuidAux,
        userHas: this.userHas,

        status,
      };

      return <InnerComponent {...innerProps} />;
    }
  }

  Wrapper.typeHydrationId = InnerComponent.typeHydrationId;
  hoistNonReactStatics(Wrapper, InnerComponent);

  return Wrapper;
}
