import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func } from 'prop-types';

import FamilyDetailsForm from 'sly/components/organisms/FamilyDetailsForm';
import { createValidator, required, email, usPhone } from 'sly/services/validation';
import withApi from 'sly/services/newApi/withApi';

const validate = createValidator({
  name: [required],
  phone: [required, usPhone],
  email: [required, email],
  residentName: [required],
  lookingFor: [required],
  gender: [required],
  preferredLocation: [required],
  budget: [required],
  timeToMove: [required],
});

const ReduxForm = reduxForm({
  form: 'FamilyDetailsForm',
  validate,
})(FamilyDetailsForm);

@withApi

class FamilyDetailsFormContainer extends Component {
  static propTypes = {
    api: object,
  };

  handleSubmit = () => {};

  render() {
    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        {...this.props}
      />
    );
  }
}

export default FamilyDetailsFormContainer;
