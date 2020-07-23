// todo: temp file
import React, { Component } from 'react';
import { object, func, oneOf, string, bool } from 'prop-types';
import { connect } from 'react-redux';

import { authenticateCancel, authenticateSuccess } from 'sly/web/store/authenticated/actions';
import { withAuth } from 'sly/web/services/api';
import { WizardController, WizardStep, WizardSteps } from 'sly/web/services/wizard';
import { Box, Block } from 'sly/common/components/atoms';
import { Wrapper } from 'sly/common/services/auth/components/Template';
import LoginFormContainer from 'sly/common/services/auth/containers/LoginFormContainer';

const mapStateToProps = state => ({
  authenticated: state.authenticated,
});

@withAuth
@connect(mapStateToProps, {
  authenticateCancel,
  authenticateSuccess,
})

export default class AuthContainer extends Component {
  static propTypes = {
    authenticated: object,
    authenticateCancel: func.isRequired,
    authenticateSuccess: func.isRequired,
    onAuthenticateSuccess: func,
    onSignupSuccess: func,
    sendOtpCode: func.isRequired,
    type: oneOf(['modal', 'inline']).isRequired,
    initialStep: string.isRequired,
    signUpHeading: string,
    signUpSubmitButtonText: string,
    signUpHasPassword: bool.isRequired,
    hasProviderSignup: bool.isRequired,
    formName: string.isRequired,
  };

  static defaultProps = {
    type: 'modal',
    initialStep: 'Login',
    formName: 'AuthForm',
    signUpHasPassword: true,
    hasProviderSignup: true,
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

  handleAuthenticateSuccess = () => {
    const { onAuthenticateSuccess, authenticateSuccess } = this.props;

    // authenticateSuccess is not a promise, hence call success event callback immediately
    authenticateSuccess();
    if (onAuthenticateSuccess) {
      onAuthenticateSuccess();
    }
  };

  render() {
    const { authenticated, type, formName,
    } = this.props;
    let { initialStep } = this.props;

    if (authenticated.options && authenticated.options.register) {
      initialStep = 'Signup';
    }
    if (authenticated.options && authenticated.options.provider) {
      initialStep = 'ProviderSignup';
    }

    const wizard = (
      <WizardController
        formName={formName}
        controllerKey={`${formName}ControllerKey`}
        initialStep={initialStep}
        onComplete={this.handleAuthenticateSuccess}
      >
        {({
          goto, next, ...props
        }) => (
          <WizardSteps {...props}>
            <WizardStep
              component={LoginFormContainer}
              name="Login"
              onRegisterClick={() => goto('Signup')}
              onResetPasswordClick={() => goto('ResetPassword')}
              onSubmit={this.handleAuthenticateSuccess}
            />
            <WizardStep
              component={LoginFormContainer}
              name="ResetPassword"
              onRegisterClick={() => goto('Signup')}
              onResetPasswordClick={() => goto('ResetPassword')}
              onSubmit={this.handleAuthenticateSuccess}
            />
          </WizardSteps>
        )}
      </WizardController>
    );

    if (type === 'inline') {
      return (
        <Wrapper>
          <Box>
            {wizard}
          </Box>
        </Wrapper>
      );
    }

    return (
      <Block paddingLeft="xLarge" paddingRight="xLarge" paddingBottom="xLarge">
        {wizard}
      </Block>
    );
  }
}
