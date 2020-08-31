import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { connect } from 'react-redux';
import { func, bool, object } from 'prop-types';
import * as immutable from 'object-path-immutable';

import { withAuth, query, prefetch } from 'sly/web/services/api';
import { createValidator, required, email, usPhone, minLength } from 'sly/web/services/validation';
import SignupForm from 'sly/common/services/auth/components/SignupForm';

const validate = createValidator({
  firstName: [required],
  email: [required, email],
  phone_number: [required, usPhone],
  password: [required, minLength(8)],
});

const ReduxForm = reduxForm({
  form: 'SignupForm',
  validate,
})(SignupForm);

const mapDispatchToProps = {
  clearSubmitErrors: () => clearSubmitErrors('SignupForm'),
};

@withAuth
@prefetch('uuidAux', 'getUuidAux', req => req({ id: 'me' }))
@connect(null, mapDispatchToProps)
@query('updateUuidAux', 'updateUuidAux')

export default class SignupFormContainer extends Component {
  static propTypes = {
    registerUser: func,
    clearSubmitErrors: func,
    submitFailed: bool,
    onSubmit: func,
    status: object,
    updateUuidAux: func,
  };

  updatePhoneContactPreference = (phonePreference) => {
    const { updateUuidAux, status } = this.props;
    if (phonePreference) {
      const { uuidAux: { result: rawUuidAux } } =  status;
      const sendUuidAux = immutable.set(rawUuidAux, 'attributes.uuidInfo.contactInfo.phonePreference', phonePreference);
      return updateUuidAux({ id: sendUuidAux.id }, sendUuidAux);
    }
    return Promise.resolve();
  };

  handleSubmit = ({ phonePreference, ...data }) => {
    const { registerUser, clearSubmitErrors, onSubmit } = this.props;
    data = { ...data, name: `${data.firstName}${data.lastName ? ` ${data.lastName}` : ''}` };

    clearSubmitErrors();
    return Promise.all([registerUser(data), this.updatePhoneContactPreference(phonePreference)])
      .then(onSubmit)
      .catch((data) => {
        // TODO: Need to set a proper way to handle server side errors
        const errorMessage = Object.values(data.body.errors).join('. ');
        throw new SubmissionError({ _error: errorMessage });
      });
  };

  render() {
    return (
      <ReduxForm
        {...this.props}
        onSubmit={this.handleSubmit}
      />
    );
  }
}
