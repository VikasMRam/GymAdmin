import React, { Component } from 'react';
import { connect } from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { object, func } from 'prop-types';

import prefetch from './prefetch';
import withApi from './withApi';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

const mapStateToProps = (state, { status }) => ({
  isUserLoggedIn: status.user.status !== 401,
});

export default function withUser(InnerComponent) {
  @withApi

  @prefetch('user', 'getUser', req => req({ id: 'me' }))

  @connect(mapStateToProps)

  class Wrapper extends Component {
    static displayName = `withUser(${getDisplayName(InnerComponent)})`;

    static propTypes = {
      api: object.isRequired,
      status: object.isRequired,
    };

    static WrappedComponent = InnerComponent;

    render = () => <InnerComponent {...this.props} />
  }

  hoistNonReactStatic(Wrapper, InnerComponent);

  return Wrapper;
}
