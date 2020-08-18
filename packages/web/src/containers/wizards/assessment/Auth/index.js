import React, { Component } from 'react';
import { func, string, object } from 'prop-types';
import { withRouter } from 'react-router-dom';

import { query, withUser } from 'sly/web/services/api';
import SlyEvent from 'sly/web/services/helpers/events';
import { community as communityPropType } from 'sly/common/propTypes/community';
import { CONSULTATION_REQUESTED, PROFILE_CONTACTED, PRICING_REQUEST, WIZARD_STEP_COMPLETED }
  from 'sly/web/services/api/constants';
import AuthContainer from 'sly/common/services/auth/containers/AuthContainer';
import userPropType from 'sly/common/propTypes/user';

@withUser
@withRouter
@query('createAction', 'createUuidAction')

export default class Auth extends Component {
  static propTypes = {
    createAction: func.isRequired,
    user: userPropType,
    community: communityPropType,
    signUpHeading: string,
    onAuthSuccess: func,
    location: object.isRequired,
  };

  componentDidMount() {
    const { user } = this.props;

    if (user) {
      this.handleAuthSuccess();
    }
  }

  handleAuthSuccess = () => {
    const { createAction, location: { pathname }, community, user, onAuthSuccess } = this.props;
    const actionType = community ? PROFILE_CONTACTED : CONSULTATION_REQUESTED;
    SlyEvent.getInstance().sendEvent({
      category: 'assessmentWizard',
      action: actionType,
    });
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
        actionPage: pathname,
        actionInfo,
      },
    })
      .then(() => createAction({
        type: 'UUIDAction',
        attributes: {
          actionType: WIZARD_STEP_COMPLETED,
          actionPage: pathname,
          actionInfo: {
            stepName: 'auth',
            wizardName: 'assessmentWizard',
            data: actionInfo,
          },
        },
      }))
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
        signUpHeading={signUpHeading}
        initialStep="Signup"
        formName="AssessmentWizardAuthForm"
        signUpSubmitButtonText="Get Pricing"
        signUpHasPassword={false}
        hasProviderSignup={false}
      />
    );
  }
}
