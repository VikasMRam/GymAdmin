import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { func } from 'prop-types';
import { connect } from 'react-redux';

import { createValidator, required, email } from 'sly/services/validation';

import LoginForm from 'sly/components/organisms/LoginForm';
import { resourceCreateRequest } from 'sly/store/resource/actions';

const validate = createValidator({
  email: [required, email],
  password: [required],
});
const ReduxForm = reduxForm({
  form: 'LoginForm',
  validate,
})(LoginForm);

class LoginFormContainer extends Component {
  static propTypes = {
    login: func,
    clearSubmitErrors: func,
    onSubmitSuccess: func,
  };

  handleOnSubmit = (values) => {
    const { login, onSubmitSuccess, clearSubmitErrors } = this.props;
    const { email, password } = values;
    const payload = { email, password };

    clearSubmitErrors();
    return login(payload).then(onSubmitSuccess).catch((r) => {
      // TODO: Need to set a proper way to handle server side errors
      const { response } = r;
      return response.json().then(() => {
        throw new SubmissionError({ _error: 'Oops! That email / password combination is not valid.' });
      });
    });
  }

  render() {
    return (
      <ReduxForm
        onSubmit={this.handleOnSubmit}
        {...this.props}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(resourceCreateRequest('login', data)),
  clearSubmitErrors: () => dispatch(clearSubmitErrors('LoginForm')),
});

export default connect(null, mapDispatchToProps)(LoginFormContainer);
