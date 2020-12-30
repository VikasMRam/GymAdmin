import React, { Component } from 'react';
import { func, string, object } from 'prop-types';
import { withRouter } from 'react-router';

import { query, withUser } from 'sly/web/services/api';
import SlyEvent from 'sly/web/services/helpers/events';
import { community as communityPropType } from 'sly/common/propTypes/community';
import { CONSULTATION_REQUESTED, PROFILE_CONTACTED, PRICING_REQUEST, WIZARD_STEP_COMPLETED } from 'sly/web/services/api/constants';
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
    submitButtonText: string,
    onAuthSuccess: func,
    location: object.isRequired,
    stepName: string.isRequired,
  };

  static defaultProps = {
    stepName: 'step-7:Auth',
  };

  componentDidMount() {
    const { user } = this.props;

    if (user) {
      this.handleAuthSuccess();
    }
  }

  handleAuthSuccess = () => {
    const { createAction, location: { pathname }, community, user, onAuthSuccess, stepName, data = {} } = this.props;
    const actionType = community ? PROFILE_CONTACTED : CONSULTATION_REQUESTED;
    SlyEvent.getInstance().sendEvent({
      category: 'assessmentWizard',
      action: actionType,
    });
    SlyEvent.getInstance().sendEvent({
      category: 'assessmentWizard',
      action: 'stepCompleted',
      label: stepName,
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
    }).then(onAuthSuccess);
  };

  render() {
    const { user, signUpHeading, submitButtonText } = this.props;

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
        signUpSubmitButtonText={submitButtonText}
        signUpHasPassword={false}
        hasProviderSignup={false}
      />
    );
  }
}
