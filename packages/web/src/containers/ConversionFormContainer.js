import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func, bool } from 'prop-types';

import { withUser } from 'sly/services/api';

import {
  createValidator,
  createBooleanValidator,
  notProvided,
  required,
  email,
  usPhone,
} from 'sly/services/validation';
import ConversionForm from 'sly/components/organisms/ConversionForm';

const validate = createValidator({
  full_name: [required],
  email: [email],
  phone: [required, usPhone],
});

const hasOnlyEmail = createBooleanValidator({
  name: [notProvided],
  email: [required, email],
  phoneNumber: [notProvided],
});

const ReduxForm = reduxForm({
  form: 'ConversionForm',
  destroyOnUnmount: false,
  // required to refresh when initialValues change. Ref: https://redux-form.com/6.7.0/examples/initializefromstate/
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate,
})(ConversionForm);

@withUser

export default class ConversionFormContainer extends Component {
  static propTypes = {
    community: object,
    user: object,
    submitRegularConversion: func.isRequired,
  };

  render() {
    const {
      submitRegularConversion,
      user,
      community,
      ...props
    } = this.props;

    const { email, name, phoneNumber } = user || {};

    // have to put empty values as letting undefined would make the fields
    // uncontrolled and we would get a warning
    const initialValues = {
      email: email || '',
      phone: phoneNumber || '',
      full_name: name || '',
    };
    let agent = null;
    if (community) {
      const { agents } = community;
      [agent] = agents;
    }

    return (
      <ReduxForm
        initialValues={initialValues}
        onSubmit={submitRegularConversion}
        agent={agent}
        community={community}
        hasOnlyEmail={user && hasOnlyEmail(user)}
        {...props}
      />
    );
  }
}

