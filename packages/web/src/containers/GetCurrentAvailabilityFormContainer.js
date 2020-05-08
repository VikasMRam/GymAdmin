import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func } from 'prop-types';

import { createValidator, required, email } from 'sly/services/validation';
import { withUser } from 'sly/services/api';
import GetCurrentAvailabilityForm from 'sly/components/molecules/GetCurrentAvailabilityForm';

const validate = createValidator({
  email: [required, email],
});

const ReduxForm = reduxForm({
  form: 'GetCurrentAvailabilityForm',
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate,
})(GetCurrentAvailabilityForm);

@withUser

export default class GetCurrentAvailabilityFormContainer extends Component {
  static propTypes = {
    submitExpressConversion: func.isRequired,
    user: object,
  };

  render() {
    const { user, submitExpressConversion } = this.props;
    const { email } = user || {};
    const initialValues = { email };

    return (
      <ReduxForm
        initialValues={initialValues}
        onSubmit={submitExpressConversion}
      />
    );
  }
}
