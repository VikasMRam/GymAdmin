import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import pick from 'lodash/pick';
import get from 'lodash/get';
import set from 'lodash/set';

import { useUser } from './withUser';
import { isServer } from 'sly/web/config';
import { useApi, hasSession } from 'sly/web/services/api';

import { ensureAuthenticated as ensureAuthenticatedAction } from 'sly/web/store/actions';

// returns null on server and when there is no response from the user/me resource yet
// false when there is no session or user is not authorised and true when logged in
const isLoggedIn = (userInfo) => {
  if (isServer) {
    return null;
  }

  if (!hasSession()) {
    return false;
  }

  if (!userInfo.hasFinished) {
    return null;
  }

  return userInfo.status === 200;
};

export const useAuth = () => {
  const { api, dispatch } = useApi();
  const {
    user,
    info: { user: userInfo },
    fetchUser,
    invalidateUser,
  } = useUser();

  const userApiMethods = useMemo(() => [
    'registerUser',
    'updateUser',
    'loginUser',
    'logoutUser',
    'recoverPassword',
    'resetPassword',
    'setPassword',
    'updatePassword',
    'thirdPartyLogin',
    'resendOtpCode',
    'otpLoginUser',
    'sendOtpCode',
  ].reduce((acc, method) => {
    acc[method] = (...args) => dispatch(api[method].asAction(...args));
    return acc;
  }, {}), [api, dispatch]);

  const registerUser = useCallback((options = {}) => {
    const { ignoreExisting, ...data } = options;

    return userApiMethods.registerUser(data)
      .catch((e) => {
        const alreadyExists = e.status && e.status === 409;
        if (ignoreExisting && alreadyExists) {
          return Promise.resolve();
        }
        return Promise.reject(e);
      })
      .then(fetchUser);
  }, []);

  const createOrUpdateUser = useCallback((data, { ignoreAlreadyRegistered } = {}) => {
    const { name, phone, email } = data;

    if (!phone && !email) return Promise.resolve();

    if (!user) {
      return registerUser({
        name,
        email,
        phone_number: phone,
      })
        .catch((e) => {
          const alreadyExists = e.status && e.status === 409;
          if (ignoreAlreadyRegistered && alreadyExists) {
            return Promise.resolve({ alreadyExists });
          }
          return Promise.reject(e);
        });
    }

    const userData = pick(userInfo.result, [
      'id',
      'type',
      'attributes.name',
      'attributes.phone',
      'attributes.email',
    ]);

    const willUpdate = Object.entries({
      'attributes.name': name,
      'attributes.phoneNumber': phone,
      'attributes.email': email,
    }).reduce((willUpdate, [path, newValue]) => {
      if (newValue && newValue !== get(userData, path)) {
        set(userData, path, newValue);
        return true;
      }
      return willUpdate;
    }, false);

    if (willUpdate) {
      return userApiMethods.updateUser({ id: userData.id }, userData);
    }

    return Promise.resolve();
  }, [user, userInfo]);

  const loginUser = useCallback((data) => {
    return userApiMethods.loginUser(data).then(fetchUser);
  }, []);

  const logoutUser = useCallback((data) => {
    return userApiMethods.logoutUser(data).then(fetchUser);
  }, []);

  const recoverPassword = useCallback((data) => {
    return userApiMethods.recoverPassword(data);
  }, []);

  const resetPassword = useCallback((data) => {
    return userApiMethods.resetPassword(data);
  }, []);

  const setPassword = useCallback((data) => {
    return userApiMethods.setPassword(data).then(fetchUser);
  }, []);

  const updatePassword = useCallback((data) => {
    return userApiMethods.updatePassword(data).then(fetchUser);
  }, []);

  const thirdPartyLogin = useCallback((data) => {
    return userApiMethods.thirdPartyLogin(data).then(fetchUser);
  }, []);

  const resendOtpCode = useCallback((data) => {
    return userApiMethods.resendOtpCode(data);
  }, []);

  const otpLoginUser = useCallback((data) => {
    return userApiMethods.otpLoginUser(data).then(fetchUser);
  }, []);

  const sendOtpCode = useCallback((data) => {
    return userApiMethods.sendOtpCode(data);
  }, []);

  const authenticated = useSelector(state => state.authenticated);
  const reduxDispatch = useDispatch();
  const ensureAuthenticated = useCallback((...args) => {
    return reduxDispatch(ensureAuthenticatedAction(...args));
  }, []);

  return {
    isLoggedIn: isLoggedIn(userInfo),
    user,
    userInfo,
    fetchUser,
    invalidateUser,
    createOrUpdateUser,
    loginUser,
    logoutUser,
    registerUser,
    setPassword,
    updatePassword,
    recoverPassword,
    resetPassword,
    thirdPartyLogin,
    resendOtpCode,
    otpLoginUser,
    sendOtpCode,
    authenticated,
    ensureAuthenticated,
  };
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

export default function withAuth(InnerComponent) {
  const WithAuth = ({ status = {}, ...props }) => {
    const { userInfo, fetchUser, invalidateUser, ...auth } = useAuth();
    return (
      <InnerComponent
        status={{
          ...status,
          user: {
            ...userInfo,
            refetch: fetchUser,
            invalidate: invalidateUser,
          }
        }}
        {...props}
        {...auth}
      />
    );
  }

  WithAuth.displayName = `withAuth(${getDisplayName(InnerComponent)})`;
  WithAuth.WrappedComponent = InnerComponent;
  hoistNonReactStatic(WithAuth, InnerComponent);

  return WithAuth;
}
