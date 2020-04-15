import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { withRouter } from 'react-router';
import { reduxForm } from 'redux-form';

import emailPropType from 'sly/propTypes/email';
import { getRelationship, prefetch, query } from 'sly/services/api';
import EmailSharePageForm from 'sly/components/pages/EmailSharePageForm';
import { createValidator, email, required } from 'sly/services/validation';
import withUser from 'sly/services/api/withUser';
import userPropType from 'sly/propTypes/user';
import { connect } from 'react-redux';

const formName = 'EmailShareForm';

export const validate = createValidator({
  'to.name': [required],
  'to.email': [email, required],
  'from.name': [required],
  'from.email': [email, required],
});

const ReduxForm = reduxForm({
  form: formName,
  validate,
  destroyOnUnmount: false,
})(EmailSharePageForm);

@withUser
@withRouter
@query('createEmail', 'createEmail')
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
    createEmail: func.isRequired,
  };

  onSubmit = (data) => {
    const { createEmail } = this.props;
    return createEmail({
      attributes: data,
    });
  };

  render() {
    const { email, user, currentValues, status } = this.props;

    // TODO: handle error
    const from = user?.contact || {};
    const initialValues = {
      from,
      to: {},
      info: {
        clonedEmailId: email?.id,
      },
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
