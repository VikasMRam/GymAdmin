import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { func } from 'prop-types';
import { connect } from 'react-redux';

import { createValidator, required, email, minLength } from 'sly/services/validation';
import LoginForm from 'sly/components/organisms/LoginForm';
import { withAuth } from 'sly/services/newApi';

const validate = createValidator({
  email: [required, email],
  password: [required, minLength(8)],
});

const ReduxForm = reduxForm({
  form: 'LoginForm',
  validate,
})(LoginForm);

const mapDispatchToProps = dispatch => ({
  clearSubmitErrors: () => dispatch(clearSubmitErrors('LoginForm')),
});

@withAuth

@connect(null, mapDispatchToProps)

export default class LoginFormContainer extends Component {
  static displayName = 'LoginFormContainer';

  static propTypes = {
    loginUser: func.isRequired,
    clearSubmitErrors: func,
    onSubmitSuccess: func,
  };

  handleOnSubmit = (values) => {
    const { loginUser, onSubmitSuccess, clearSubmitErrors } = this.props;
    const { email, password } = values;
    const payload = { email, password };

    clearSubmitErrors();
    return loginUser(payload)
      .then(res => {
        console.log('here then')
        return res;
      })
      .then(onSubmitSuccess).catch((error) => {
      console.log('here catch')
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
        onSubmit={this.handleOnSubmit}
        {...this.props}
      />
    );
  }
}

