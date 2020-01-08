import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { func, string } from 'prop-types';
import { connect } from 'react-redux';

import { createValidator, required, email } from 'sly/services/validation';
import { withAuth } from 'sly/services/newApi';
import withNotification from 'sly/controllers/withNotification';
import PartnerAgentLoginForm from 'sly/components/organisms/PartnerAgentLoginForm';

const formName = 'PartnerAgentLoginForm';

const validate = createValidator({
  email: [email, required],
  password: [required],
});

const ReduxForm = reduxForm({
  form: formName,
  validate,
})(PartnerAgentLoginForm);

const mapDispatchToProps = {
  clearSubmitErrors: (name = formName) => clearSubmitErrors(name),
};

@withAuth
@withNotification
@connect(null, mapDispatchToProps)

export default class PartnerAgentLoginFormContainer extends Component {
  static propTypes = {
    resendOtpCode: func.isRequired,
    loginUser: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    clearSubmitErrors: func,
    onSubmit: func,
    form: string,
  };

  handleOnSubmit = ({ email, password }) => {
    const { loginUser, onSubmit, clearSubmitErrors, form } = this.props;
    const payload = { email, password };

    clearSubmitErrors(form);
    return loginUser(payload)
      .then(onSubmit)
      .catch((error) => {
        // TODO: Need to set a proper way to handle server side errors
        if (error.status === 400) {
          return Promise.reject(new SubmissionError({ _error: 'Oops! That email / password combination is not valid.' }));
        }

        return Promise.reject(error);
      });
  };

  render() {
    return (
      <ReduxForm
        {...this.props}
        onSubmit={this.handleOnSubmit}
      />
    );
  }
}
