import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func } from 'prop-types';
import immutable from 'object-path-immutable';
import pick from 'lodash/pick';
import { connect } from 'react-redux';

import FamilyDetailsForm from 'sly/components/organisms/FamilyDetailsForm';
import { createValidator, email, usPhone } from 'sly/services/validation';
import clientPropType from 'sly/propTypes/client';
import { query, getRelationship } from 'sly/services/newApi';

const validate = createValidator({
  phone: [usPhone],
  email: [email],
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
    const { id: uuidID } = uuidAux;
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
    let newClient = immutable(pick(rawClient, ['id', 'type', 'attributes.clientInfo']));
    if (name) {
      newClient.set('attributes.clientInfo.name', name);
    }
    if (email) {
      newClient.set('attributes.clientInfo.email', email);
    }
    if (phone) {
      newClient.set('attributes.clientInfo.phoneNumber', phone);
    }
    newClient = newClient.value();
    let newUuidAux = immutable(pick(uuidAux, ['id', 'type', 'attributes.uuidInfo', 'attributes.uuid']));
    if (residentName) {
      newUuidAux.set('attributes.uuidInfo.residentInfo.fullName', residentName);
    }
    if (gender) {
      newUuidAux.set('attributes.uuidInfo.residentInfo.gender', gender);
    }
    if (budget) {
      newUuidAux.set('attributes.uuidInfo.financialInfo.maxMonthlyBudget', budget);
    }
    if (lookingFor) {
      newUuidAux.set('attributes.uuidInfo.housingInfo.lookingFor', lookingFor);
    }
    if (timeToMove) {
      newUuidAux.set('attributes.uuidInfo.housingInfo.moveTimeline', timeToMove);
    }
    if (locationInfo) {
      newUuidAux.set('attributes.uuidInfo.locationInfo', locationInfo);
    }
    newUuidAux = newUuidAux.value();

    return updateClient({ id }, newClient)
      .then(() => updateUuidAux({ id: uuidID }, newUuidAux))
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
