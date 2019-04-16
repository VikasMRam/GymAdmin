import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getSearchParams } from 'sly/services/helpers/search';
import { createValidator, required } from 'sly/services/validation';
import { resourceCreateRequest } from 'sly/store/resource/actions';
import PasswordResetPage from 'sly/components/pages/PasswordResetPage';
import AuthContainer from 'sly/containers/AuthContainer';
import ModalController from 'sly/controllers/ModalController';
import NotificationController from 'sly/controllers/NotificationController';

const validate = createValidator({
  password: [required],
});
const ReduxForm = reduxForm({
  form: 'PasswordResetForm',
  validate,
})(PasswordResetPage);

class PasswordResetPageContainer extends Component {
  static propTypes = {
    history: object,
    resetPassword: func,
    clearSubmitErrors: func,
    searchParams: object,
  };

  handleOnSubmit = (values, gotoLogin) => {
    const {
      resetPassword, clearSubmitErrors, searchParams, history,
    } = this.props;
    const { password } = values;
    const { token } = searchParams;
    const payload = { token, password };

    clearSubmitErrors();
    return resetPassword(payload).then(() => {
      history.push('/');
      gotoLogin();
    }).catch((r) => {
      // TODO: Need to set a proper way to handle server side errors
      const { response } = r;
      return response.json().then((data) => {
        const errorMessage = Object.values(data.errors).join('. ');
        throw new SubmissionError({ _error: errorMessage });
      });
    });
  };

  render() {
    return (
      <NotificationController>
        {({
            notifyInfo,
        }) => (
          <ModalController>
            {({
              show,
              hide,
            }) => (
              <AuthContainer notifyInfo={notifyInfo} showModal={show} hideModal={hide}>
                {({ gotoLogin }) => (
                  <ReduxForm
                    onSubmit={values => this.handleOnSubmit(values, gotoLogin)}
                    {...this.props}
                  />
                )}
              </AuthContainer>
            )}
          </ModalController>
        )}
      </NotificationController>
    );
  }
}

const mapStateToProps = (state, { history, match, location }) => ({
  history,
  searchParams: getSearchParams(match, location),
});

const mapDispatchToProps = dispatch => ({
  resetPassword: data => dispatch(resourceCreateRequest('passwordReset', data)),
  clearSubmitErrors: () => dispatch(clearSubmitErrors('PasswordResetForm')),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PasswordResetPageContainer));
