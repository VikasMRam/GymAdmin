import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func, arrayOf } from 'prop-types';
import immutable from 'object-path-immutable';
import pick from 'lodash/pick';
import { connect } from 'react-redux';

import { required, createValidator, email, usPhone, dependentRequired } from 'sly/services/validation';
import clientPropType from 'sly/propTypes/client';
import userPropType from 'sly/propTypes/user';
import { USER_RESOURCE_TYPE } from 'sly/constants/resourceTypes';
import { query, getRelationship, prefetch } from 'sly/services/newApi';
import SlyEvent from 'sly/services/helpers/events';
import { selectFormData, trimFormData } from 'sly/services/helpers/forms';
import FamilyDetailsForm from 'sly/components/organisms/FamilyDetailsForm';

const validate = createValidator({
  name: [required],
  phone: [usPhone, dependentRequired('email', 'Either Phone or Email is required')],
  email: [email, dependentRequired('phone', 'Either Email or Phone is required')],
});

const formName = 'FamilyDetailsForm';

const ReduxForm = reduxForm({
  form: formName,
  validate,
})(FamilyDetailsForm);

@prefetch('users', 'getUsers')

@query('updateClient', 'updateClient')

@query('updateUuidAux', 'updateUuidAux')

@connect((state, props) => ({
  uuidAux: getRelationship(state, props.rawClient, 'uuidAux'),
  formData: selectFormData(state, formName, {}),
}))

export default class FamilyDetailsFormContainer extends Component {
  static propTypes = {
    updateClient: func.isRequired,
    updateUuidAux: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    client: clientPropType.isRequired,
    users: arrayOf(userPropType),
    rawClient: object,
    uuidAux: object,
    formData: object,
    status: object,
  };

  handleSubmit = (data) => {
    const {
      client, updateClient, rawClient, notifyInfo, notifyError, uuidAux, updateUuidAux,
    } = this.props;
    const { id } = client;
    const { id: uuidID } = uuidAux;
    trimFormData(data);
    const {
      name,
      email,
      phone,
      tags,
      slyMessage,
      residentName,
      lookingFor,
      gender,
      age,
      budget,
      timeToMove,
      preferredLocation,
      roomPreference,
      mobilityLevel,
      communityCareType,
      assignedTo,
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
    if (email || email === '') {
      newClient.set('attributes.clientInfo.email', email);
    }
    if (phone) {
      newClient.set('attributes.clientInfo.phoneNumber', phone);
    }

    if (slyMessage) {
      newClient.set('attributes.clientInfo.slyMessage', slyMessage);
    }
    if (assignedTo) {
      newClient.set('relationships.admin.data', {
        type: USER_RESOURCE_TYPE,
        id: assignedTo,
      });
    }

    let newUuidAux = immutable(pick(uuidAux, ['id', 'type', 'attributes.uuidInfo', 'attributes.uuid']));
    if (residentName) {
      newUuidAux.set('attributes.uuidInfo.residentInfo.fullName', residentName);
    }
    if (gender) {
      newUuidAux.set('attributes.uuidInfo.residentInfo.gender', gender);
    }
    if (age) {
      // This is an int on server side
      newUuidAux.set('attributes.uuidInfo.residentInfo.age', parseInt(age, 10));
    }
    if (mobilityLevel) {
      // FIXME: Mobility on backend is an array
      newUuidAux.set('attributes.uuidInfo.careInfo.mobility', [mobilityLevel]);
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
    if (communityCareType) {
      newUuidAux.set('attributes.uuidInfo.housingInfo.typeCare', [communityCareType]);
    }
    if (roomPreference) {
      newUuidAux.set('attributes.uuidInfo.housingInfo.roomPreference', [roomPreference]);
    }
    if (locationInfo) {
      newUuidAux.set('attributes.uuidInfo.locationInfo', locationInfo);
    }
    newUuidAux = newUuidAux.value();

    newClient.set('relationships.uuidAux.data', newUuidAux);
    newClient = newClient.value();
    return updateClient({ id }, newClient)
      // .then(() => updateUuidAux({ id: uuidID }, newUuidAux))
      .then(() => {
        notifyInfo('Family successfully updated.');
        SlyEvent.getInstance().sendEvent({
          category: 'fdetails-form',
          action: 'submit',
          label: 'user-details',
          value: '',
        });
      })
      .catch((r) => {
        // TODO: Need to set a proper way to handle server side errors
        const { body } = r;
        const errorMessage = body.errors.map(e => e.title).join('. ');
        console.error(errorMessage);
        notifyError('Failed to update. Please try again.');
      });
  };

  render() {
    const { client, formData, users, status, ...props } = this.props;
    const { users: usersStatus } = status;
    const { hasFinished: usersHasFinished } = usersStatus;
    if (!usersHasFinished) {
      return null;
    }

    const { clientInfo, uuidAux, tags } = client;
    const {
      name, email, slyMessage, phoneNumber = '',
    } = clientInfo;
    const { uuidInfo } = uuidAux;
    const {
      residentInfo, housingInfo, financialInfo, locationInfo, careInfo,
    } = uuidInfo;
    // FIXME: Frontend and backend differ in []string and stringfor certain fields
    let { mobility } = careInfo;
    if (mobility) {
      [mobility] = mobility;
    }
    const { fullName, gender, age } = residentInfo;
    const { lookingFor, moveTimeline } = housingInfo;
    let { typeCare, roomPreference } = housingInfo;
    if (typeCare) {
      [typeCare] = typeCare;
    }
    if (roomPreference) {
      [roomPreference] = roomPreference;
    }
    const { maxMonthlyBudget } = financialInfo;
    let preferredLocation = '';
    if (locationInfo) {
      const { city, state } = locationInfo;
      preferredLocation = `${city}, ${state}`;
    }
    let assignedTo;
    if (client.admin) {
      assignedTo = client.admin.id;
    }
    const initialValues = {
      name,
      email,
      phone: phoneNumber,
      residentName: fullName,
      lookingFor,
      gender,
      age,
      roomPreference,
      mobilityLevel: mobility,
      communityCareType: typeCare,
      budget: maxMonthlyBudget,
      timeToMove: moveTimeline,
      preferredLocation,
      slyMessage,
      assignedTo,
      contactPreferences: ['sms', 'email'],
    };
    ({ preferredLocation } = formData);

    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
        preferredLocation={preferredLocation}
        assignedTos={users}
        {...props}
      />
    );
  }
}
