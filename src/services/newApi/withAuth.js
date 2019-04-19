import React, { Component } from 'react';
import { connect } from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { object, func } from 'prop-types';

import withUser from './withUser';

import { ensureAuthenticated } from 'sly/store/actions';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

const mapDispatchToProps = dispatch => ({
  ensureAuthenticated: (...args) => dispatch(ensureAuthenticated(...args)),
  dispatch,
});

export default function withAuth(InnerComponent) {
  @withUser

  @connect(null, mapDispatchToProps)

  class Wrapper extends Component {
    static displayName = `withAuth(${getDisplayName(InnerComponent)})`;

    static propTypes = {
      ensureAuthenticated: func.isRequired,
      api: object.isRequired,
      dispatch: func.isRequired,
      status: object.isRequired,
    };

    static WrappedComponent = InnerComponent;

    ensureAuthenticated = (...args) => {
      const { ensureAuthenticated } = this.props;
      return ensureAuthenticated(...args);
    };

    registerUser = (options = {}) => {
      const { dispatch, api, status } = this.props;
      const { ignoreExisting, ...data } = options;
      // FIXME: API does not give enough info on how to figure ignoreExisting
      // FIXME: @knlshah, please fix this both here and api
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