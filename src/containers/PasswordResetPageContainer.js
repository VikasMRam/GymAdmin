import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';

import { getSearchParams } from 'sly/services/helpers/search';
import { createValidator, required } from 'sly/services/validation';
import PasswordResetPage from 'sly/components/pages/PasswordResetPage';
import api from 'sly/services/newApi/apiInstance';

const validate = createValidator({
  password: [required],
});
const ReduxForm = reduxForm({
  form: 'PasswordResetForm',
  validate,
})(PasswordResetPage);


const mapStateToProps = (state, { history, match, location }) => ({
  history,
  searchParams: getSearchParams(match, location),
});

const mapDispatchToProps = {
  resetPassword: data => api.resetPassword(data).asAction,
  clearSubmitErrors: () => clearSubmitErrors('PasswordResetForm'),
};

@connect(mapStateToProps, mapDispatchToProps)

export default class PasswordResetPageContainer extends Component {
  static propTypes = {
    history: object,
    resetPassword: func,
    clearSubmitErrors: func,
    searchParams: object,
  };

  handleOnSubmit = (values) => {
    const {
      resetPassword, clearSubmitErrors, searchParams, history,
    } = this.props;
    const { password } = values;
    const { token } = searchParams;
    const payload = { token, password };

    clearSubmitErrors();
    return resetPassword(payload).then(() => {
      history.push('/dashboard');
    }).catch(({ body }) => {
      // TODO: Need to set a proper way to handle server side errors
      const errorMessage = Object.values(body.errors).join('. ');
      throw new SubmissionError({ _error: errorMessage });
    });
  };

  render() {
    return (
      <ReduxForm
        onSubmit={values => this.handleOnSubmit(values)}
        {...this.props}
      />
    );
  }
}
