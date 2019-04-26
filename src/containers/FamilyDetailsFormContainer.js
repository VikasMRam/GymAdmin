import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func } from 'prop-types';
import immutable from 'object-path-immutable';
import pick from 'lodash/pick';
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

@query('updateUuidAux', 'updateUuidAux')

@connect((state, props) => ({
  uuidAux: getRelationship(state, props.rawClient, 'uuidAux'),
}))

export default class FamilyDetailsFormContainer extends Component {
  static propTypes = {
    updateClient: func.isRequired,
    updateUuidAux: func.isRequired,
    notifyError: func.isRequired,
    client: clientPropType.isRequired,
    rawClient: object,
    uuidAux: object,
  };

  handleSubmit = (data) => {
    const {
      client, updateClient, rawClient, notifyError, uuidAux, updateUuidAux,
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
    let locationInfo = {};
    if (preferredLocation) {
      const [city, state] = preferredLocation.split(',');
      locationInfo = {
        city,
        state,
      };
    }
    const newClient = immutable(pick(rawClient, ['id', 'type', 'attributes.clientInfo']))
      .set('attributes.clientInfo.name', name)
      .set('attributes.clientInfo.email', email)
      .set('attributes.clientInfo.phoneNumber', phone)
      .value();
    const newUuidAux = immutable(pick(uuidAux, ['id', 'type', 'attributes.uuidInfo', 'attributes.uuid']))
      .set('attributes.uuidInfo.residentInfo.fullName', residentName)
      .set('attributes.uuidInfo.residentInfo.gender', gender)
      .set('attributes.uuidInfo.financialInfo.maxMonthlyBudget', budget)
      .set('attributes.uuidInfo.housingInfo.lookingFor', lookingFor)
      .set('attributes.uuidInfo.housingInfo.moveTimeline', timeToMove)
      .set('attributes.uuidInfo.locationInfo', locationInfo)
      .value();

    return updateClient({ id }, newClient)
      .then(() => updateUuidAux({ id: newUuidAux.attributes.uuid }, newUuidAux).catch(e => Promise.reject(e)))
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
