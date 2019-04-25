import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func } from 'prop-types';
import produce from 'immer';
import { getRelationship } from 'redux-bees';
import { connect } from 'react-redux';

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

@connect((state, props) => ({
  uuidAux: getRelationship(state, props.rawClient, 'uuidAux'),
}))

export default class FamilyDetailsFormContainer extends Component {
  static propTypes = {
    updateClient: func.isRequired,
    notifyError: func.isRequired,
    client: clientPropType.isRequired,
    rawClient: object,
    uuidAux: object,
  };

  handleSubmit = (data) => {
    const {
      client, updateClient, rawClient, notifyError, uuidAux,
    } = this.props;
    const { id } = client;
    const {
      name,
      email,
      phone,
      residentName,
      lookingFor,
      gender,
      budget,
      timeToMove,
      preferredLocation,
    } = data;

    return updateClient({ id }, produce(rawClient, (draft) => {
      const newAux = { ...uuidAux };
      let locationInfo = {};
      if (preferredLocation) {
        const [city, state] = preferredLocation.split(',');
        locationInfo = {
          city,
          state,
        };
      }
      newAux.attributes.uuidInfo.residentInfo.fullName = residentName;
      newAux.attributes.uuidInfo.residentInfo.gender = gender;
      newAux.attributes.uuidInfo.financialInfo.maxMonthlyBudget = budget;
      newAux.attributes.uuidInfo.housingInfo.lookingFor = lookingFor;
      newAux.attributes.uuidInfo.housingInfo.moveTimeline = timeToMove;
      newAux.attributes.uuidInfo.locationInfo = locationInfo;
      draft.attributes.clientInfo.name = name;
      draft.attributes.clientInfo.email = email;
      draft.attributes.clientInfo.phoneNumber = phone;
      draft.relationships.uuidAux = {
        data: newAux,
      };
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
    const { clientInfo, uuidAux } = client;
    const {
      name, email, slyMessage, phoneNumber,
    } = clientInfo;
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
