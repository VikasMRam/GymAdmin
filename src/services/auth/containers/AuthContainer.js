import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';

import { authenticateCancel, authenticateSuccess } from 'sly/store/authenticated/actions';
import { withAuth } from 'sly/services/api';
import spacing from 'sly/components/helpers/spacing';
import withNotification from 'sly/controllers/withNotification';
import { WizardController, WizardStep, WizardSteps } from 'sly/services/wizard';
import { email } from 'sly/services/validation';
import Modal, { HeaderWithClose } from 'sly/components/atoms/NewModal';

import LoginOrRegisterFormContainer from 'sly/services/auth/containers/LoginOrRegisterFormContainer';
import LoginWithPasswordFormContainer from 'sly/services/auth/containers/LoginWithPasswordFormContainer';
import ResetPasswordFormContainer from 'sly/services/auth/containers/ResetPasswordFormContainer';
import CreatePasswordFormContainer from 'sly/services/auth/containers/CreatePasswordFormContainer';
import OtpLoginFormContainer from 'sly/services/auth/containers/OtpLoginFormContainer';
import PartnerAgentLoginFormContainer from 'sly/services/auth/containers/PartnerAgentLoginFormContainer';

const ModalBody = spacing(styled.div``, { top: null });

const mapStateToProps = state => ({
  authenticated: state.authenticated,
});

@withRouter
@withAuth
@withNotification
@connect(mapStateToProps, {
  authenticateCancel,
  authenticateSuccess,
})

export default class AuthContainer extends Component {
  static propTypes = {
    authenticated: object,
    authenticateCancel: func.isRequired,
    authenticateSuccess: func.isRequired,
    notifyInfo: func.isRequired,
    showModal: func.isRequired,
    hideModal: func.isRequired,
    sendOtpCode: func.isRequired,
    notifyError: func.isRequired,
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

  gotoOtpLogin = (goto, emailOrPhone) => {
    const { sendOtpCode, notifyError } = this.props;
    let payload = {};
    if (!email(emailOrPhone)) {
      payload = {
        email: emailOrPhone,
      };
    } else {
      payload = {
        phone_number: emailOrPhone,
      };
    }

    return sendOtpCode(payload)
      .then(() => goto('OtpLogin'))
      .catch(() => {
        notifyError('Failed to send code. Please try again.');
      });
  };

  render() {
    const { isOpen } = this.state;
    const { authenticateCancel, authenticateSuccess, authenticated } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        onClose={authenticateCancel}
      >
        <HeaderWithClose onClose={authenticateCancel} />
        <ModalBody>
          <WizardController
            formName="AuthForm"
            controllerKey="AuthFormControllerKey"
            initialStep={authenticated.options && authenticated.options.emailOrPhone ? 'LoginWithPassword' : null}
            onComplete={authenticateSuccess}
          >
            {({
              data: { emailOrPhone = authenticated.options && authenticated.options.emailOrPhone }, goto, next, ...props
            }) => (
              <WizardSteps {...props}>
                <WizardStep
                  component={LoginOrRegisterFormContainer}
                  name="LoginOrRegister"
                  heading={authenticated.reason}
                  onUserAlreadyExists={() => goto('LoginWithPassword')}
                  onSocialSigninSuccess={authenticateSuccess}
                  onPartnerAgentLoginClick={() => goto('PartherAgentLogin')}
                />
                <WizardStep
                  component={CreatePasswordFormContainer}
                  name="CreatePassword"
                  onDoThisLaterClick={authenticateSuccess}
                  onSubmit={authenticateSuccess}
                />
                <WizardStep
                  component={PartnerAgentLoginFormContainer}
                  name="PartherAgentLogin"
                  onRegisterClick={() => goto('LoginOrRegister')}
                  onResetPasswordClick={next}
                  onSubmit={authenticateSuccess}
                />
                <WizardStep
                  component={ResetPasswordFormContainer}
                  name="ResetPassword"
                  onLoginClick={() => emailOrPhone ? goto('LoginWithPassword') : goto('LoginOrRegister')}
                  onSubmit={() => goto('LoginWithPassword')}
                />
                <WizardStep
                  component={OtpLoginFormContainer}
                  name="OtpLogin"
                  emailOrPhone={emailOrPhone}
                  onSubmit={authenticateSuccess}
                />
                <WizardStep
                  component={LoginWithPasswordFormContainer}
                  name="LoginWithPassword"
                  emailOrPhone={emailOrPhone}
                  initialValues={authenticated.options && authenticated.options.emailOrPhone ? { emailOrPhone: authenticated.options.emailOrPhone }  : null}
                  onSubmitSuccess={authenticateSuccess}
                  onResetPasswordClick={() => goto('ResetPassword')}
                  onLoginWithOtpClick={() => this.gotoOtpLogin(goto, emailOrPhone)}
                />
              </WizardSteps>
            )}
          </WizardController>
        </ModalBody>
      </Modal>
    );
  }
}
