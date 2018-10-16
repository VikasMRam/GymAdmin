import React, { Component } from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import { func } from 'prop-types';
import { connect } from 'react-redux';

import { createValidator, required, email } from 'sly/services/validation';

import LoginForm from 'sly/components/organisms/LoginForm';
import { resourceCreateRequest, resourceDetailReadRequest } from 'sly/store/resource/actions';

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
    fetchUser: func,
  };
  handleOnSubmit = (values) => {
    const { login, fetchUser } = this.props;
    const { email, password } = values;
    const payload = { email, password };
    return login(payload).then(() => {
      // Close Modal
      fetchUser();
    }).catch((r) => {
      // TODO: Need to set a proper way to handle server side errors
      const { response } = r;
      return response.json().then(() => {
        throw new SubmissionError({ _error: 'Oops! That email / password combination is not valid.' });
      });
    });
  }

  render(props) {
    return (
      <ReduxForm
        onSubmit={this.handleOnSubmit}
        {...props}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(resourceCreateRequest('login', data)),
  fetchUser: () => dispatch(resourceDetailReadRequest('user', 'me')),
});

export default connect(null, mapDispatchToProps)(LoginFormContainer);
