import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { withRouter } from 'react-router';
import emailPropType from 'sly/common/propTypes/email';
import { prefetch, query } from 'sly/web/services/api';
import EmailSharePageForm from 'sly/web/components/pages/EmailSharePageForm';
import { createValidator, email, required } from 'sly/web/services/validation';
import withUser from 'sly/web/services/api/withUser';
import userPropType from 'sly/common/propTypes/user';

const formName = 'EmailShareForm';

export const validate = createValidator({
  toName: [required],
  toEmail: [email, required],
  fromName: [required],
  fromEmail: [email, required],
});

const ReduxForm = reduxForm({
  form: formName,
  validate,
  destroyOnUnmount: false,
})(EmailSharePageForm);

@withUser
@withRouter
@query('createShareEmail', 'createShareEmail')
@prefetch('email', 'getEmail', (req, { match }) => req({
  id: match.params.id,
}))

@connect(state => ({
  currentValues: state.form[formName]?.values,
  state,
}))

export default class EmailSharePageFormContainer extends Component {
  static propTypes = {
    user: userPropType.isRequired,
    email: emailPropType.isRequired,
    status: object.isRequired,
    createShareEmail: func.isRequired,
  };

  onSubmit = (data) => {
    const { createShareEmail } = this.props;
    return createShareEmail({
      attributes: data,
    });
  };

  render() {
    const { email, user, currentValues, status } = this.props;
    const { hasFinished: userHasFinished } = status.user;
    const { hasFinished: emailHasFinished } = status.email;

    if (!(emailHasFinished && userHasFinished)) {
      return <div>Loading...</div>;
    }
    // TODO: handle error
    const from = user || {};
    const initialValues = {
      fromName: from.name,
      fromEmail: from.email,
      emailId: email?.id,
    };

    return (
      <ReduxForm
        onSubmit={this.onSubmit}
        email={email || {}}
        initialValues={initialValues}
        currentValues={currentValues}
        from={from}
      />
    );
  }
}
