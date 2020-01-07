import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { authenticateCancel, authenticateSuccess } from 'sly/store/authenticated/actions';
import { withAuth } from 'sly/services/newApi';
import { WizardController, WizardStep, WizardSteps } from 'sly/services/wizard';
import LoginOrRegisterFormContainer from 'sly/containers/LoginOrRegisterFormContainer';
import LoginWithPasswordFormContainer from 'sly/containers/LoginWithPasswordFormContainer';
import ResetPasswordFormContainer from 'sly/containers/ResetPasswordFormContainer';
import CreatePasswordFormContainer from 'sly/containers/CreatePasswordFormContainer';
import OtpLoginFormContainer from 'sly/containers/OtpLoginFormContainer';
import Modal from 'sly/components/molecules/Modal';

const mapStateToProps = state => ({
  authenticated: state.authenticated,
});

@withRouter
@withAuth
@connect(mapStateToProps, {
  authenticateCancel,
  authenticateSuccess,
})

export default class AuthContainer extends Component {
  static propTypes = {
    authenticated: object,
    authenticateCancel: func,
    authenticateSuccess: func,
    notifyInfo: func,
    showModal: func,
    hideModal: func,
    children: func,
    sendOtpCode: func.isRequired,
  };

  state = { isOpen: false };

  componentDidMount() {
    this.shouldAuth();
  }

  componentDidUpdate() {
    this.shouldAuth();
  }

  shouldAuth = () => {
    const {
      authenticated,
    } = this.props;

    if (!this.state.isOpen && authenticated.loggingIn) {
      this.setState({ isOpen: true });
    } else if (this.state.isOpen && !authenticated.loggingIn) {
      this.setState({ isOpen: false });
    }
  };

  gotoOtpLogin = (goto) => {
    const { sendOtpCode } = this.props;

    return sendOtpCode()
      .then(() => goto('OtpLogin'))
      .catch((error) => {
        // error
      });
  };

  render() {
    const { isOpen } = this.state;
    const { authenticateCancel, authenticateSuccess } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        onClose={authenticateCancel}
        closeable
      >
        <WizardController
          formName="AuthForm"
          onComplete={authenticateSuccess}
        >
          {({
            data: { emailOrPhone }, goto, next, ...props
          }) => (
            <WizardSteps {...props}>
              <WizardStep
                component={LoginOrRegisterFormContainer}
                name="LoginOrRegister"
                onUserAlreadyExists={() => goto('LoginWithPassword')}
                onSocialSigninSuccess={authenticateSuccess}
                onPartnerAgentLoginClick={() => goto('LoginWithPassword')}
              />
              <WizardStep
                component={CreatePasswordFormContainer}
                name="CreatePassword"
                onDoThisLaterClick={authenticateSuccess}
              />
              <WizardStep
                component={ResetPasswordFormContainer}
                name="ResetPassword"
                onLoginClick={() => emailOrPhone ? goto('LoginWithPassword') : goto('LoginOrRegister')}
                onSuccess={() => goto('LoginWithPassword')}
              />
              <WizardStep
                component={OtpLoginFormContainer}
                name="OtpLogin"
                emailOrPhone={emailOrPhone}
                onSubmitSuccess={authenticateSuccess}
              />
              <WizardStep
                component={LoginWithPasswordFormContainer}
                name="LoginWithPassword"
                emailOrPhone={emailOrPhone}
                onSubmitSuccess={authenticateSuccess}
                onResetPasswordClick={() => goto('ResetPassword')}
                onLoginWithOtpClick={() => this.gotoOtpLogin(goto)}
              />
            </WizardSteps>
          )}
        </WizardController>
      </Modal>
    );
  }
}
