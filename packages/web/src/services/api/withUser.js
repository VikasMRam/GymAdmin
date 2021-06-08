import React, { useMemo, useCallback } from 'react';
import get from 'lodash/get';
import hoistNonReactStatics from 'hoist-non-react-statics';

import { usePrefetch } from 'sly/web/services/api/prefetch';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

export const useUser = () => {
  const uuidAux = usePrefetch('getUuidAux', { id: 'me' }, { loggedInOnly: true });
  const user = usePrefetch('getUser', { id: 'me' });
  const getCurrentUser = useCallback(() => user.getCurrentRequestInfo().normalized);

  return useMemo(() => {
    return {
      uuidAux: uuidAux.requestInfo.normalized,
      fetchUuidAux: uuidAux.fetch,
      invalidateUuidAux: uuidAux.invalidate,

      user: user.requestInfo.normalized,
      fetchUser: user.fetch,
      invalidateUser: user.invalidate,
      getCurrentUser,

      info: {
        uuidAux: uuidAux.requestInfo,
        user: user.requestInfo,
      },
    };
  }, [uuidAux, user]);
};

export default function withUser(InnerComponent) {
  const Wrapper = ({ status = {}, ...props }) => {
    const { user, uuidAux, fetchUser, invalidateUser, fetchUuidAux, invalidateUuidAux, info, getCurrentUser } = useUser();

    const userHas = useCallback((fields) => {
      if (!user) return false;
      return !fields.some(field => !get(user, field, false));
    }, [user]);

    const innerProps = useMemo(() => ({
      status: {
        ...status,
        uuidAux: {
          ...info.uuidAux,
          refetch: fetchUuidAux,
          invalidate: invalidateUuidAux,
        },
        user: {
          ...info.user,
          refetch: fetchUser,
          getCurrentUser,
          invalidate: invalidateUser,
        },
      },
      user,
      uuidAux,
      userHas,
    }), [user, uuidAux, userHas, ...Object.values(status)]);

    return <InnerComponent {...props} {...innerProps} />;
  };

  Wrapper.displayName = `withUser(${getDisplayName(InnerComponent)})`;
  Wrapper.WrappedComponent = InnerComponent.WrappedComponent || InnerComponent;
  hoistNonReactStatics(Wrapper, InnerComponent);

  return Wrapper;
}
