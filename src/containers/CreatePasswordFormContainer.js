import React, { Component } from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import { func } from 'prop-types';

import withNotification from 'sly/controllers/withNotification';
import { createValidator, required, minLength } from 'sly/services/validation';
import { withAuth, withUser } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';
import CreatePasswordForm from 'sly/components/organisms/CreatePasswordForm';

const validate = createValidator({
  password: [required, minLength(8)],
});

const formName = 'CreatePasswordForm';

const ReduxForm = reduxForm({
  form: formName,
  validate,
  destroyOnUnmount: false,
})(CreatePasswordForm);

@withAuth
@withNotification
@withUser

export default class CreatePasswordFormContainer extends Component {
  static propTypes = {
    setPassword: func,
    notifyInfo: func.isRequired,
    onDoThisLaterClick: func,
    onSubmit: func,
    user: userPropType.isRequired,
  };

  handleSubmit = ({ password }) => {
    const { setPassword, notifyInfo, user, onSubmit } = this.props;
    const { email } = user;
    const payload = { password, email };

    return setPassword(payload)
      .catch((error) => {
        const { status, body } = error;
        if (status === 400) {
          const { errors } = body;
          const errorMessage = errors[0] && errors[0].title ? errors[0].title : 'Generic Error';
          throw new SubmissionError({ _error: errorMessage });
        }
      })
      .then(onSubmit)
      .then(() => {
        notifyInfo('Password created successfully');
      });
  };

  render() {
    const { onDoThisLaterClick, ...props } = this.props;

    return (
      <ReduxForm
        {...props}
        onSubmit={this.handleSubmit}
        onDoThisLaterClick={onDoThisLaterClick}
      />
    );
  }
}
