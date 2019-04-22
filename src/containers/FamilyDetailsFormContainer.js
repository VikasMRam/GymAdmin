import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func } from 'prop-types';
import produce from 'immer';

import FamilyDetailsForm from 'sly/components/organisms/FamilyDetailsForm';
import { createValidator, required, email, usPhone } from 'sly/services/validation';
import clientPropType from 'sly/propTypes/client';
import { query } from 'sly/services/newApi';

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

@query('updateClient', 'updateClient')

export default class FamilyDetailsFormContainer extends Component {
  static propTypes = {
    updateClient: func.isRequired,
    notifyError: func.isRequired,
    client: clientPropType.isRequired,
    rawClient: object,
  };

  handleSubmit = (data) => {
    const {
      client, updateClient, rawClient, notifyError,
    } = this.props;
    const { id } = client;
    const {
      name,
      email,
      phoneNumber,
      fullName,
      lookingFor,
      gender,
      maxMonthlyBudget,
      moveTimeline,
      preferredLocation,
    } = data;

    return updateClient({ id }, produce(rawClient, (draft) => {
      draft.attributes.clientInfo.name = name;
      draft.attributes.clientInfo.email = email;
      draft.attributes.admin.phoneNumber = phoneNumber;
      draft.attributes.uuidAux.uuidInfo.residentInfo.fullName = fullName;
      draft.attributes.uuidAux.uuidInfo.residentInfo.gender = gender;
      draft.attributes.uuidAux.uuidInfo.financialInfo.maxMonthlyBudget = maxMonthlyBudget;
      draft.attributes.uuidAux.uuidInfo.housingInfo.lookingFor = lookingFor;
      draft.attributes.uuidAux.uuidInfo.housingInfo.moveTimeline = moveTimeline;
      draft.attributes.uuidAux.uuidInfo.locationInfo.preferredLocation = preferredLocation;
    }))
      .catch((r) => {
        // TODO: Need to set a proper way to handle server side errors
        const { body } = r;
        const errorMessage = body.errors.map(e => e.title).join('. ');
        console.error(errorMessage);
        notifyError('Failed to update. Please try again.');
      });
  };

  render() {
    const { client, ...props } = this.props;
    const { clientInfo, uuidAux, admin } = client;
    const { phoneNumber } = admin;
    const { name, email, slyMessage } = clientInfo;
    const { uuidInfo } = uuidAux;
    const {
      residentInfo, housingInfo, financialInfo, locationInfo,
    } = uuidInfo;
    const { fullName, gender } = residentInfo;
    const { lookingFor, moveTimeline } = housingInfo;
    const { maxMonthlyBudget } = financialInfo;
    let preferredLocation = '';
    if (locationInfo) {
      const { city, state } = locationInfo;
      preferredLocation = `${city}, ${state}`;
    }
    const initialValues = {
      name,
      email,
      phone: phoneNumber,
      residentName: fullName,
      lookingFor,
      gender,
      budget: maxMonthlyBudget,
      timeToMove: moveTimeline,
      preferredLocation,
    };

    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
        intro={slyMessage}
        {...props}
      />
    );
  }
}
