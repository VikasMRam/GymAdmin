import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { object, func } from 'prop-types';
import pick from 'lodash/pick';
import get from 'lodash/get';
import set from 'lodash/set';

import withUser from './withUser';

import { ensureAuthenticated } from 'sly/store/actions';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

const mapStateToProps = state => ({
  authenticated: state.authenticated,
});

const mapDispatchToProps = dispatch => ({
  ensureAuthenticated: (...args) => dispatch(ensureAuthenticated(...args)),
  dispatch,
});

export default function withAuth(InnerComponent) {
  @withUser

  @connect(mapStateToProps, mapDispatchToProps)

  class Wrapper extends PureComponent {
    static displayName = `withAuth(${getDisplayName(InnerComponent)})`;

    static propTypes = {
      authenticated: object,
      ensureAuthenticated: func.isRequired,
      api: object.isRequired,
      dispatch: func.isRequired,
      status: object.isRequired,
      user: object,
      updateUser: func.isRequired,
    };

    static WrappedComponent = InnerComponent;

    createOrUpdateUser = (data, { ignoreAlreadyRegistered } = {}) => {
      const { user, updateUser, status } = this.props;
      const { name, phone, email } = data;

      if (!phone && !email) return Promise.resolve();

      if (!user) {
        return this.registerUser({
          name,
          email,
          phone_number: phone,
        }).catch((error) => {
          if (!(error.status === 400 && ignoreAlreadyRegistered)) {
            return Promise.reject(error);
          }
          return Promise.resolve();
        });
      }

      const userData = pick(status.user.result, [
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
        return updateUser({ id: userData.id }, userData);
      }

      return Promise.resolve();
    };

    registerUser = (options = {}) => {
      const { dispatch, api, status } = this.props;
      const { ignoreExisting, ...data } = options;

      return dispatch(api.registerUser(data)).catch((e) => {
        const alreadyExists = e.body
          && e.body.errors
          && Object.values(e.body.errors)
            .some(e => e.includes('user already exists'));
        if (ignoreExisting && alreadyExists) {
          return Promise.resolve();
        }
        return Promise.reject(e);
      }).then(status.user.refetch);
    };

    loginUser = (data) => {
      const { dispatch, api, status } = this.props;
      return dispatch(api.loginUser(data)).then(status.user.refetch);
    };

    logoutUser = (data) => {
      const { dispatch, api, status } = this.props;
      return dispatch(api.logoutUser(data)).then(status.user.refetch);
    };

    recoverPassword = (data) => {
      const { dispatch, api } = this.props;
      return dispatch(api.recoverPassword(data));
    };

    setPassword = (data) => {
      const { dispatch, api, status } = this.props;
      return dispatch(api.setPassword(data)).then(status.user.refetch);
    };

    ensureAuthenticated = (...args) => {
      const { ensureAuthenticated } = this.props;
      return ensureAuthenticated(...args);
    };

    updatePassword = (data) => {
      const { dispatch, api, status } = this.props;
      return dispatch(api.updatePassword(data)).then(status.user.refetch);
    };

    thirdPartyLogin = (data) => {
      const { dispatch, api, status } = this.props;
      return dispatch(api.thirdPartyLogin(data)).then(status.user.refetch);
    };

    render = () => (
      <InnerComponent
        {...this.props}
        isLoggedIn={this.props.status.user.status === 200}
        createOrUpdateUser={this.createOrUpdateUser}
        loginUser={this.loginUser}
        logoutUser={this.logoutUser}
        registerUser={this.registerUser}
        setPassword={this.setPassword}
        updatePassword={this.updatePassword}
        recoverPassword={this.recoverPassword}
        thirdPartyLogin={this.thirdPartyLogin}
        ensureAuthenticated={this.ensureAuthenticated}
      />
    );
  }

  hoistNonReactStatic(Wrapper, InnerComponent);

  return Wrapper;
}
