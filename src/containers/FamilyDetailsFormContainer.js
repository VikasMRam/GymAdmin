import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func } from 'prop-types';

import FamilyDetailsForm from 'sly/components/organisms/FamilyDetailsForm';
import { createValidator, required, email, usPhone } from 'sly/services/validation';
import clientPropType from 'sly/propTypes/client';
import { withApi } from 'sly/services/newApi';

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

export default class FamilyDetailsFormContainer extends Component {
  static propTypes = {
    api: object,
    client: clientPropType.isRequired,
  };

  handleSubmit = () => {};

  render() {
    const { client } = this.props;
    const { clientInfo, uuidAux, admin } = client;
    const { phoneNumber } = admin;
    const { name, email, slyMessage } = clientInfo;
    const { uuidInfo } = uuidAux;
    const { residentInfo, housingInfo, financialInfo } = uuidInfo;
    const { fullName, gender } = residentInfo;
    const { lookingFor, moveTimeline } = housingInfo;
    const { maxMonthlyBudget } = financialInfo;
    const initialValues = {
      name,
      email,
      phone: phoneNumber,
      residentName: fullName,
      lookingFor,
      gender,
      budget: maxMonthlyBudget,
      timeToMove: moveTimeline,
    };

    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
        intro={slyMessage}
      />
    );
  }
}
