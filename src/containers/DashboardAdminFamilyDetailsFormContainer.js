import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func } from 'prop-types';
import * as immutable from 'object-path-immutable';
import pick from 'lodash/pick';
import { connect } from 'react-redux';
import { createValidator, email, usPhone, dependentRequired, required } from 'sly/services/validation';
import clientPropType from 'sly/propTypes/client';
import { query, getRelationship } from 'sly/services/newApi';
import SlyEvent from 'sly/services/helpers/events';
import { selectFormData } from 'sly/services/helpers/forms';
import DashboardAdminFamilyDetailsForm from 'sly/components/organisms/DashboardAdminFamilyDetailsForm';
import { newClient } from 'sly/constants/payloads/client';

const validate = createValidator({
  phone: [usPhone, dependentRequired('email', 'Either Phone or Email is required')],
  email: [email, dependentRequired('phone', 'Either Email or Phone is required')],
  referralSource: required,
});

const formName = 'DashboardAdminFamilyDetailsForm';

const ReduxForm = reduxForm({
  form: formName,
  validate,
})(DashboardAdminFamilyDetailsForm);

@query('createClient', 'createClient')
@query('updateClient', 'updateClient')
@query('updateUuidAux', 'updateUuidAux')
@query('createUuidAux', 'createUuidAux')

@connect((state, props) => ({
  uuidAux: getRelationship(state, props.rawClient, 'uuidAux'),
  formData: selectFormData(state, formName, {}),
}))

export default class DashboardFamilyDetailsFormContainer extends Component {
  static propTypes = {
    createClient: func.isRequired,
    postCreateClient: func,
    updateUuidAux: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    uuidAux: object,
    initialFormData: object,
    formData: object,
  };

  handleSubmit = (data) => {
    const {
      createClient, notifyInfo, notifyError, postCreateClient
    } = this.props;
    const {
      name,
      email,
      phone,
      preferredLocation,
      residentName,
      gender,
      budget,
      lookingFor,
      timeToMove,
    } = data;
    let locationInfo = {};
    if (preferredLocation) {
      const [city, state] = preferredLocation.split(',');
      locationInfo = {
        city,
        state,
      };
    }
    let newBareClient = immutable(pick(newClient, ['id', 'type', 'attributes.clientInfo', 'relationships']));
    if (name) {
      newBareClient.set('attributes.clientInfo.name', name);
    }
    if (email || email === '') {
      newBareClient.set('attributes.clientInfo.email', email);
    }
    if (phone) {
      newBareClient.set('attributes.clientInfo.phoneNumber', phone);
    }

    let newUuidAux = immutable(pick(newBareClient, ['relationships.uuidAux']));

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
    newBareClient.set('relationships.uuidAux', newUuidAux);
    newBareClient = newBareClient.value();

    // FIXME: query
    return createClient(newBareClient)
      .then((r) => {
        const { body } = r;
        notifyInfo('Family successfully created.');
        SlyEvent.getInstance().sendEvent({
          category: 'admin-fdetails-form',
          action: 'submit',
          label: 'user-details',
          value: '',
        });
        if (postCreateClient) {
          postCreateClient(body.data);
        }
      })
      .catch((r) => {
        const { body } = r;
        const errorMessage = body.errors.map(e => e.title).join('. ');
        console.error(errorMessage);
        notifyError('Failed to update. Please try again.');
      });
  };

  render() {
    const { initialFormData, ...props } = this.props;
    const {
      name, email, phoneNumber, referralSource,
    } = initialFormData;

    const initialValues = {
      name,
      email,
      phone: phoneNumber,
      referralSource,
    };

    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
        {...props}
      />
    );
  }
}
