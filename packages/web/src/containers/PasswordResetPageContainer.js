import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getSearchParams } from 'sly/web/services/helpers/search';
import { DASHBOARD_PATH } from 'sly/web/constants/dashboardAppPaths';
import { createValidator, required } from 'sly/web/services/validation';
import { withRedirectTo } from 'sly/common/services/redirectTo';
import { withAuth } from 'sly/web/services/api';
import PasswordResetPage from 'sly/web/components/pages/PasswordResetPage';

const validate = createValidator({
  password: [required],
});
const ReduxForm = reduxForm({
  form: 'PasswordResetForm',
  validate,
})(PasswordResetPage);

const mapStateToProps = (state, { match, location }) => ({
  searchParams: getSearchParams(match, location),
});

const mapDispatchToProps = {
  clearSubmitErrors: () => clearSubmitErrors('PasswordResetForm'),
};

@withRedirectTo
@withAuth
@connect(mapStateToProps, mapDispatchToProps)

export default class PasswordResetPageContainer extends Component {
  static propTypes = {
    clearSubmitErrors: func,
    searchParams: object,
    redirectTo: func.isRequired,
    resetPassword: func.isRequired,
  };

  handleOnSubmit = ({ password }) => {
    const {
      resetPassword, clearSubmitErrors, searchParams: { token }, redirectTo,
    } = this.props;
    const payload = { token, password };

    clearSubmitErrors();
    return resetPassword(payload)
      .then(() => {
        redirectTo(DASHBOARD_PATH);
      }).catch(({ body }) => {
        // TODO: Need to set a proper way to handle server side errors
        const errorMessage = Object.values(body.errors).join('. ');
        throw new SubmissionError({ _error: errorMessage });
      });
  };

  handleOnClose = () => {
    const { redirectTo } = this.props;

    redirectTo('/');
  };

  render() {
    const { searchParams: { token } } = this.props;

    if (!token) {
      return <Redirect to="/" />;
    }

    return (
      <ReduxForm
        onSubmit={this.handleOnSubmit}
        onClose={this.handleOnClose}
        {...this.props}
      />
    );
  }
}
