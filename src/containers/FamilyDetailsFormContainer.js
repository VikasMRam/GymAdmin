import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func, arrayOf } from 'prop-types';
import * as immutable from 'object-path-immutable';
import pick from 'lodash/pick';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

import { required, createValidator, email, usPhone, dependentRequired } from 'sly/services/validation';
import clientPropType from 'sly/propTypes/client';
import userPropType from 'sly/propTypes/user';
import { USER_RESOURCE_TYPE } from 'sly/constants/resourceTypes';
import { FAMILY_STAGE_WON } from 'sly/constants/familyDetails';
import { query, getRelationship } from 'sly/services/newApi';
import SlyEvent from 'sly/services/helpers/events';
import { validateAM } from 'sly/services/helpers/client';
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

@query('updateClient', 'updateClient')

@query('updateUuidAux', 'updateUuidAux')

@connect((state, props) => ({
  uuidAux: getRelationship(state, props.rawClient, 'uuidAux'),
  formData: selectFormData(state, formName),
}))

export default class FamilyDetailsFormContainer extends Component {
  static propTypes = {
    updateClient: func.isRequired,
    refetchClient: func.isRequired,
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
      client, updateClient, refetchClient, rawClient, notifyInfo, notifyError, uuidAux,
    } = this.props;
    const { id } = client;
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
      additionalMetadata,
      referralSource,
      medicaid,
      slyAgentMessage,
      slyCommunityMessage,
      moveInDate,
      communityName,
      moveRoomType,
      monthlyFees,
      referralAgreement,
      referralAgreementType,
      invoiceAmount,
      invoiceNumber,
      invoicePaid,
    } = data;
    let locationInfo = {};
    if (preferredLocation) {
      const [city, state] = preferredLocation.split(',');
      locationInfo = {
        city,
        state,
      };
    }
    let newClient = immutable.wrap(pick(rawClient, ['id', 'type', 'attributes.clientInfo']));
    if (name) {
      newClient.set('attributes.clientInfo.name', name);
    }
    if (email || email === '') {
      newClient.set('attributes.clientInfo.email', email);
    }
    if (phone || phone === '') {
      newClient.set('attributes.clientInfo.phoneNumber', phone);
    }
    if (referralSource) {
      newClient.set('attributes.clientInfo.referralSource', referralSource);
    }
    const validMD = validateAM(additionalMetadata, { phone, email });
    if (validMD) {
      newClient.set('attributes.clientInfo.additionalMetadata', validMD);
    }

    if (slyMessage) {
      newClient.set('attributes.clientInfo.slyMessage', slyMessage);
    }
    if (slyAgentMessage) {
      newClient.set('attributes.clientInfo.slyAgentMessage', slyAgentMessage);
    }
    if (slyCommunityMessage) {
      newClient.set('attributes.clientInfo.slyCommunityMessage', slyCommunityMessage);
    }
    if (assignedTo) {
      newClient.set('relationships.admin.data', {
        type: USER_RESOURCE_TYPE,
        id: assignedTo,
      });
    }
    if (tags) {
      newClient.set('relationships.tags.data', tags.map(({ label }) => ({ type: 'Tag', attributes: { name: label } })));
    }
    if (moveInDate) {
      let moveInDateFormatted;
      const parsedDate = dayjs(moveInDate);
      if (parsedDate.isValid()) {
        moveInDateFormatted = parsedDate.format('YYYY-MM-DDTHH:mm:ss[Z]');
      } else {
        notifyError('Move-In date is invalid');
        return false;
      }
      newClient.set('attributes.clientInfo.moveInDate', moveInDateFormatted);
    }
    if (communityName) {
      newClient.set('attributes.clientInfo.communityName', communityName);
    }
    if (monthlyFees) {
      newClient.set('attributes.clientInfo.monthlyFees', parseFloat(monthlyFees));
    }
    if (referralAgreement) {
      newClient.set('attributes.clientInfo.referralAgreement', parseFloat(referralAgreement));
    }
    if (invoiceAmount) {
      newClient.set('attributes.clientInfo.invoiceAmount', parseFloat(invoiceAmount));
    }
    if (invoiceNumber) {
      newClient.set('attributes.clientInfo.invoiceNumber', invoiceNumber);
    }
    if (invoicePaid) {
      newClient.set('attributes.clientInfo.invoicePaid', invoicePaid === 'yes');
    }
    if (moveRoomType) {
      newClient.set('attributes.clientInfo.moveRoomType', moveRoomType);
    }
    if (referralAgreementType === 'percentage') {
      const moveInFee = referralAgreement * monthlyFees * 0.01;
      newClient.set('attributes.clientInfo.moveInFee', parseFloat(moveInFee));
    } else if (referralAgreementType === 'flat-fee') {
      newClient.set('attributes.clientInfo.moveInFee', parseFloat(referralAgreement));
    }
    newClient.set('attributes.clientInfo.referralAgreementType', referralAgreementType);

    let newUuidAux = immutable.wrap(pick(uuidAux, ['id', 'type', 'attributes.uuidInfo', 'attributes.uuid']));
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
      newUuidAux.set('attributes.uuidInfo.careInfo.mobility', mobilityLevel);
    }
    if (budget) {
      newUuidAux.set('attributes.uuidInfo.financialInfo.maxMonthlyBudget', budget);
    }
    if (medicaid) {
      newUuidAux.set('attributes.uuidInfo.financialInfo.medicaid', (medicaid.length > 0));
    }
    if (lookingFor) {
      newUuidAux.set('attributes.uuidInfo.housingInfo.lookingFor', lookingFor);
    }
    if (timeToMove) {
      newUuidAux.set('attributes.uuidInfo.housingInfo.moveTimeline', timeToMove);
    }
    if (communityCareType) {
      newUuidAux.set('attributes.uuidInfo.housingInfo.typeCare', communityCareType);
    }
    if (roomPreference) {
      newUuidAux.set('attributes.uuidInfo.housingInfo.roomPreference', roomPreference);
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
      .then(refetchClient)
      .catch((r) => {
        // TODO: Need to set a proper way to handle server side errors
        const { body } = r;
        const errorMessage = body.errors.map(e => e.title).join('. ');
        console.error(errorMessage);
        notifyError('Failed to update. Please try again.');
      });
  };

  render() {
    const { client, formData, ...props } = this.props;
    const { stage, clientInfo, uuidAux, tags: modelTags } = client;
    const tags = modelTags.map(({ id, name }) => ({ label: name, value: id }));
    const {
      name, email, slyMessage, phoneNumber = '', additionalMetadata, slyAgentMessage,
      slyCommunityMessage, referralSource, communityName, moveRoomType, invoiceNumber,
      invoiceAmount, moveInDate,
    } = clientInfo;
    let { monthlyFees, referralAgreementType, referralAgreement, invoicePaid } = clientInfo;
    if (invoicePaid === true) {
      invoicePaid = 'yes';
    } else if (invoicePaid === false) {
      invoicePaid = 'no';
    }
    const { uuidInfo } = uuidAux;
    const {
      residentInfo, housingInfo, financialInfo, locationInfo, careInfo,
    } = uuidInfo;
    const { mobility } = careInfo;
    const { fullName, gender, age } = residentInfo;
    const { typeCare, roomPreference, lookingFor, moveTimeline } = housingInfo;
    const { maxMonthlyBudget, medicaid } = financialInfo;
    let preferredLocation = '';
    if (locationInfo && locationInfo.city) {
      const { city, state } = locationInfo;
      preferredLocation = [city, state].filter(v => v).join(', ');
    }
    let assignedTo;
    if (client.admin) {
      assignedTo = client.admin.id;
    }
    let medicaidValue = [];
    if (medicaid) {
      medicaidValue = [true];
    }
    if (formData) {
      ({ referralAgreementType, referralAgreement, monthlyFees, preferredLocation } = formData);
    }
    const initialValues = {
      name,
      email,
      phone: phoneNumber,
      residentName: fullName,
      lookingFor,
      gender,
      age,
      tags,
      roomPreference,
      mobilityLevel: mobility,
      communityCareType: typeCare,
      budget: maxMonthlyBudget,
      referralSource,
      medicaid: medicaidValue,
      timeToMove: moveTimeline,
      preferredLocation,
      slyMessage,
      assignedTo,
      additionalMetadata,
      slyAgentMessage,
      slyCommunityMessage,
      contactPreferences: ['sms', 'email'],
      communityName,
      moveRoomType,
      monthlyFees,
      referralAgreementType,
      referralAgreement,
      invoiceNumber,
      invoiceAmount,
      invoicePaid,
      moveInDate: moveInDate ? new Date(moveInDate) : null,
    };
    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
        preferredLocation={preferredLocation}
        referralAgreementType={referralAgreementType}
        isWon={stage === FAMILY_STAGE_WON}
        {...props}
      />
    );
  }
}
