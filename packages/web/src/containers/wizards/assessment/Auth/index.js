import React, { Component } from 'react';
import { func, string } from 'prop-types';

import { query, withUser } from 'sly/web/services/api';
import { community as communityPropType } from 'sly/web/propTypes/community';
import { CONSULTATION_REQUESTED, PROFILE_CONTACTED, PRICING_REQUEST } from 'sly/web/services/api/constants';
import AuthContainer from 'sly/web/services/auth/containers/AuthContainer';
import userPropType from 'sly/web/propTypes/user';

@withUser
@query('createAction', 'createUuidAction')

export default class Auth extends Component {
  static propTypes = {
    createAction: func.isRequired,
    user: userPropType,
    community: communityPropType,
    signUpHeading: string,
    onAuthSuccess: func,
  };

  componentDidMount() {
    const { user } = this.props;

    if (user) {
      this.handleAuthSuccess();
    }
  }

  handleAuthSuccess = () => {
    const { createAction, community, user, onAuthSuccess } = this.props;
    const actionType = community ? PROFILE_CONTACTED : CONSULTATION_REQUESTED;
    let actionInfo = {};
    if (community) {
      actionInfo = {
        contactType: PRICING_REQUEST,
        slug: community.id,
      };
    }
    actionInfo = {
      ...actionInfo,
      phone: user.phoneNumber,
      name: user.name,
      email: user.email,
    };

    createAction({
      type: 'UUIDAction',
      attributes: {
        actionType,
        actionInfo,
      },
    })
      .then(onAuthSuccess);
  };

  render() {
    const { user, signUpHeading } = this.props;

    if (user) {
      return <div />;
    }

    return (
      <AuthContainer
        type="inline"
        onAuthenticateSuccess={this.handleAuthSuccess}
        onSignupSuccess={this.handleAuthSuccess}
        initialStep="Signup"
        signUpHeading={signUpHeading}
        signUpSubmitButtonText="Get Pricing"
        signUpHasPassword={false}
      />
    );
  }
}
