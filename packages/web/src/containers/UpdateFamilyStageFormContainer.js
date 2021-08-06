import React, { Component } from 'react';
import { object, func, arrayOf, string } from 'prop-types';
import * as immutable from 'object-path-immutable';
import pick from 'lodash/pick';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import dayjs from 'dayjs';

import { query, withUser, prefetch } from 'sly/web/services/api';
import clientPropType from 'sly/common/propTypes/client';
import userPropType from 'sly/common/propTypes/user';
import { PLATFORM_ADMIN_ROLE } from 'sly/common/constants/roles';
import {
  FAMILY_STATUS_ACTIVE,
  FAMILY_STATUS_ON_PAUSE,
  FAMILY_STAGE_WON,
  FAMILY_STAGE_LOST,
  FAMILY_STAGE_REJECTED,
  ROOM_TYPES, WAITLISTED,
  FAMILY_STAGE_FAMILY_CHOSEN,
  PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS,
} from 'sly/web/constants/familyDetails';
import { NOTE_COMMENTABLE_TYPE_CLIENT, NOTE_CTYPE_ACTIVITY } from 'sly/web/constants/notes';
import { NOTE_RESOURCE_TYPE } from 'sly/web/constants/resourceTypes';
import { PROVIDER_ENTITY_TYPE_ORGANIZATION, PROVIDER_ENTITY_TYPE_COMMUNITY } from 'sly/web/constants/provider';
import { createValidator, required, float } from 'sly/web/services/validation';
import { isBoolean } from 'sly/common/services/helpers/utils';
import { getStageDetails } from 'sly/web/services/helpers/stage';
import { selectFormData } from 'sly/common/services/helpers/forms';
import { userIs } from 'sly/web/services/helpers/role';
import UpdateFamilyStageForm from 'sly/web/components/organisms/UpdateFamilyStageForm';
import SlyEvent from 'sly/web/services/helpers/events';

const validate = createValidator({
  stage: [required],
  moveInDate: [required],
  communityName: [required],
  monthlyFees: [required, float],
  referralAgreementType: [required],
  referralAgreement: [required],
  lossReason: [required],
  lostDescription: [required],
  rejectDescription: [required],
  preferredLocation: [required],
  rejectReason: [required],
});

const ReduxForm = reduxForm({
  form: 'UpdateFamilyStageForm',
  validate,
})(UpdateFamilyStageForm);

@withRouter
@query('updateClient', 'updateClient')
@query('createNote', 'createNote')
@query('updateUuidAux', 'updateUuidAux')
@withUser
@prefetch('client', 'getClient', (req, { match }) => req({
  id: match.params.id,
}))
@connect(state => ({
  formState: selectFormData(state, 'UpdateFamilyStageForm'),
}))

export default class UpdateFamilyStageFormContainer extends Component {
  static propTypes = {
    client: clientPropType,
    rawClient: object,
    notifyError: func.isRequired,
    notifyInfo: func.isRequired,
    updateClient: func.isRequired,
    createNote: func.isRequired,
    onSuccess: func,
    formState: object,
    lossReasons: arrayOf(string).isRequired,
    rejectReasons: arrayOf(string).isRequired,
    currentLossReason: string,
    updateUuidAux: func.isRequired,
    refetchClient: func.isRequired,
    refetchNotes: func.isRequired,
    invalidateClient: func,
    user: userPropType,
    initialValues: object,
  };

  currentStage = {};
  nextStage = {};

  handleUpdateStage = (data) => {
    const {
      updateClient, client, status: { client: { invalidate: invalidateClient, getRelationship } }, rawClient, notifyError, notifyInfo, onSuccess, createNote,
      updateUuidAux, refetchClient, refetchNotes, handleAskQuestionnaire } = this.props;
    const { id, clientInfo, stage: previousStage } = client;
    const {
      stage, note, moveInDate, communityName, monthlyFees, referralAgreement, lossReason, lostDescription, rejectNote,
      preferredLocation, referralAgreementType, invoiceAmount, invoiceNumber, invoicePaid, roomType,
      rejectDescription, rejectReason, chosenDetails,
    } = data;
    let notePromise = () => Promise.resolve();
    let uuidAuxPromise = () => Promise.resolve();
    let getNotesPromise = () => Promise.resolve();

    if (note) {
      const payload = {
        type: NOTE_RESOURCE_TYPE,
        attributes: {
          commentableID: id,
          commentableType: NOTE_COMMENTABLE_TYPE_CLIENT,
          body: note,
        },
      };
      notePromise = () => createNote(payload);
      getNotesPromise = () => refetchNotes();
    }

    if (stage === FAMILY_STAGE_WON || stage === FAMILY_STAGE_LOST) {
      const { name } = clientInfo;
      let moveInDateFormatted = moveInDate;
      const parsedDate = dayjs(moveInDate);
      if (parsedDate.isValid()) {
        moveInDateFormatted = parsedDate.format('MM/DD/YYYY');
      }
      let note = `${name} moved into ${communityName} on ${moveInDateFormatted} with a monthly rent of $${monthlyFees} and a referral fee of `;
      note = referralAgreementType === 'flat-fee' ? `${note}$${referralAgreement} flat fee` : `${note}${referralAgreement}% referral fee`;

      const title = 'Stage Change';
      if (stage === FAMILY_STAGE_LOST) {
        let reason = lossReason;
        if (rejectNote) {
          reason = `${lossReason}, ${rejectNote}`;
        }
        if (lostDescription) {
          reason = lostDescription;
        }
        if (PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS.includes(lossReason) && preferredLocation) {
          reason = `${lossReason}. Preferred in: ${preferredLocation.displayText}`;
        }
        note = `Stage changed from ${previousStage} to ${stage}. Closed Reason: ${reason}`;
      }
      const payload = {
        type: NOTE_RESOURCE_TYPE,
        attributes: {
          cType: NOTE_CTYPE_ACTIVITY,
          commentableID: id,
          commentableType: NOTE_COMMENTABLE_TYPE_CLIENT,
          body: note,
          title,
        },
      };
      notePromise = () => createNote(payload);
      getNotesPromise = () => refetchNotes();
    }
    const clientPromise = () => refetchClient();

    const uuidAux = getRelationship(rawClient, 'uuidAux');
    let newUuidAux = immutable.wrap(pick(uuidAux, ['id', 'type', 'attributes.uuidInfo', 'attributes.uuid']));
    let newClient = immutable.wrap(pick(rawClient, ['id', 'type', 'attributes.status', 'attributes.stage', 'attributes.clientInfo']))
      .set('attributes.status', FAMILY_STATUS_ACTIVE)
      .set('attributes.stage', stage);
    if (moveInDate) {
      let moveInDateFormatted;
      const parsedDate = dayjs(moveInDate);
      if (parsedDate.isValid()) {
        moveInDateFormatted = parsedDate.utc().format();
      } else {
        notifyError('Move-In date is invalid');
        return false;
      }
      newClient.set('attributes.clientInfo.moveInDate', moveInDateFormatted);
    }
    if (communityName) {
      newClient.set('attributes.clientInfo.communityName', communityName?.label);
    }
    if (monthlyFees) {
      newClient.set('attributes.clientInfo.monthlyFees', parseFloat(monthlyFees));
    }
    if (referralAgreement) {
      newClient.set('attributes.clientInfo.referralAgreement', parseFloat(referralAgreement));
    }
    if (lossReason) {
      newClient.set('attributes.clientInfo.lossReason', lossReason);
    }
    if (lostDescription) {
      newClient.set('attributes.clientInfo.otherText', lostDescription);
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
    if (roomType) {
      newClient.set('attributes.clientInfo.moveRoomType', roomType);
    }
    if (rejectDescription) {
      newClient.set('attributes.clientInfo.otherText', rejectDescription);
    }
    if (rejectReason) {
      newClient.set('attributes.clientInfo.rejectReason', rejectReason);
    }
    if (chosenDetails) {
      newClient.set('attributes.clientInfo.chosenDetails', chosenDetails);
    }
    newClient.set('attributes.clientInfo.referralAgreementType', referralAgreementType);
    if (referralAgreementType === 'percentage') {
      const moveInFee = referralAgreement * monthlyFees * 0.01;
      newClient.set('attributes.clientInfo.moveInFee', parseFloat(moveInFee));
    } else if (referralAgreementType === 'flat-fee') {
      newClient.set('attributes.clientInfo.moveInFee', parseFloat(referralAgreement));
    }
    const shouldUpdateUuidAux = !!preferredLocation;
    if (preferredLocation) {
      let locationInfo = {
        city: preferredLocation.city,
        state: preferredLocation.state,
      };
      if (preferredLocation.geo) {
        locationInfo = {
          ...locationInfo,
          geo: {
            latitude: preferredLocation.geo.Latitude,
            longitude: preferredLocation.geo.Longitude,
          },
        };
      }
      newUuidAux.set('attributes.uuidInfo.locationInfo', locationInfo);
    }

    if (shouldUpdateUuidAux) {
      const { id: uuidID } = uuidAux;
      newUuidAux = newUuidAux.value();

      uuidAuxPromise = () => updateUuidAux({ id: uuidID }, newUuidAux);
    }
    newClient = newClient.value();

    SlyEvent.getInstance().sendEvent({
      category: 'f-details',
      action: 'stage-change',
      label: `${this.nextStage.group}-${this.nextStage.level}`,
      value: this.nextStage.level,
    });

    return updateClient({ id }, newClient)
      .then(uuidAuxPromise)
      .then(notePromise)
      .then(clientPromise)
      .then(getNotesPromise)
      .then(() => invalidateClient({ id }))
      .then(() => {
        let msg = 'Family stage updated';
        if (this.currentStage.group !== this.nextStage.group) {
          msg += ` and moved to ${this.nextStage.group}`;
        }
        if (stage === FAMILY_STAGE_REJECTED) {
          msg = 'Family successfully rejected';
        }
        notifyInfo(msg);
      })
      .then(() => {
        const isQuestionnaireAlreadyFilled =  !!client.uuidAux.uuidInfo?.referralInfo?.leadQuality;
        if (!isQuestionnaireAlreadyFilled && (this.currentStage.group === 'Connected' && this.nextStage.stage
         !== FAMILY_STAGE_FAMILY_CHOSEN)) {
          handleAskQuestionnaire();
        } else if (onSuccess) {
          onSuccess();
        }
      })
      .catch((r) => {
        // TODO: Need to set a proper way to handle server side errors
        const { body } = r;
        const errorMessage = body.errors.map(e => e.title).join('. ');
        console.error(errorMessage);
        SlyEvent.getInstance().sendEvent({
          category: 'stg-chng-modal-f-details',
          action: 'stage-change',
          label: 'error',
          value: '',
        });
        notifyError('Failed to update stage. Please try again.');
      });
  };

  render() {
    const {
      client, formState, lossReasons, initialValues, user, ...props
    } = this.props;

    if (!client) {
      return null;
    }
    const isQuestionnaireAlreadyFilled = !!client.uuidAux.uuidInfo?.referralInfo?.leadQuality;
    const { clientInfo, stage, status, uuidAux: { uuidInfo: { locationInfo } }, provider } = client;
    const { entityType, id: providerOrg } = provider;
    const { organization } = user;
    const { id: userOrg } = organization;
    const userIsOwner = (entityType === PROVIDER_ENTITY_TYPE_ORGANIZATION && userOrg === providerOrg);
    const isPaused = status === FAMILY_STATUS_ON_PAUSE;
    const {
      name,
      moveInDate: existingMoveInDate,
      communityName: existingCommunityName,
      moveRoomType: existingMoveRoomType,
      referralAgreement: existingReferralAgreement,
      referralAgreementType: existingReferralAgreementType,
      monthlyFees: existingMonthlyFees,
      invoiceAmount: existingInvoiceAmount,
      invoiceNumber: existingInvoiceNumber,
      lossReason: existingLossReason,
      otherText,
      rejectReason,
    } = clientInfo;
    let { chosenDetails } = clientInfo;
    let { invoicePaid: existingInvoicePaid } = clientInfo;
    if (isBoolean(existingInvoicePaid)) {
      existingInvoicePaid = existingInvoicePaid ? 'yes' : 'no';
    }
    let nextGroup;
    let group;
    let nextStage;
    let currentLossReason;
    let referralAgreementType;
    let referralAgreement;
    let monthlyFees;
    let currentRejectReason;
    if (formState) {
      ({ rejectReason: currentRejectReason } = formState);
      this.currentStage = getStageDetails(stage);
      ({ group } = this.currentStage);
      ({
        stage: nextStage, lossReason: currentLossReason, referralAgreementType, referralAgreement, monthlyFees, chosenDetails,
      } = formState);
      this.nextStage = getStageDetails(nextStage);
      ({ group: nextGroup } = this.nextStage);
    }
    let preferredLocation = null;
    if (((stage === FAMILY_STAGE_LOST && PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS.includes(existingLossReason)) ||
      (stage === FAMILY_STAGE_REJECTED && PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS.includes(rejectReason))) && locationInfo && locationInfo.city) {
      const { city, state } = locationInfo;
      preferredLocation = [city, state].filter(v => v).join(', ');
    }
    const lostDescription = otherText;
    const rejectDescription = otherText;
    let existingMoveInDateFormatted;
    if (existingMoveInDate) {
      existingMoveInDateFormatted = new Date(existingMoveInDate);
      existingMoveInDateFormatted = Date.UTC(existingMoveInDateFormatted.getUTCFullYear(), existingMoveInDateFormatted.getUTCMonth(), existingMoveInDateFormatted.getUTCDate(),
        existingMoveInDateFormatted.getUTCHours(), existingMoveInDateFormatted.getUTCMinutes(), existingMoveInDateFormatted.getUTCSeconds());
    }
    const newInitialValues = {
      stage,
      chosenDetails: chosenDetails || WAITLISTED,
      moveInDate: existingMoveInDateFormatted,
      communityName: {
        label: existingCommunityName,
        value: existingCommunityName,
      },
      roomType: existingMoveRoomType,
      referralAgreement: existingReferralAgreement ? existingReferralAgreement.toString() : null,
      referralAgreementType: existingReferralAgreementType,
      monthlyFees: existingMonthlyFees ? existingMonthlyFees.toString() : null,
      invoiceAmount: existingInvoiceAmount ? existingInvoiceAmount.toString() : null,
      invoiceNumber: existingInvoiceNumber,
      invoicePaid: existingInvoicePaid,
      lossReason: existingLossReason,
      preferredLocation,
      lostDescription,
      rejectDescription,
      rejectReason,
      ...initialValues,
    };

    return (
      <ReduxForm
        {...props}
        currentStageGroup={group}
        currentStage={stage}
        nextStageGroup={nextGroup}
        chosenDetails={chosenDetails}
        nextStage={nextStage}
        name={name}
        onSubmit={this.handleUpdateStage}
        lossReasons={lossReasons}
        currentLossReason={currentLossReason}
        isPaused={isPaused}
        initialValues={newInitialValues}
        referralAgreementType={referralAgreementType}
        referralAgreement={referralAgreement}
        monthlyFees={monthlyFees}
        roomTypes={ROOM_TYPES}
        currentRejectReason={currentRejectReason}
        canUpdateStage={nextStage !== FAMILY_STAGE_REJECTED || userIs(user, PLATFORM_ADMIN_ROLE) || userIsOwner}
        userIsOwner={userIsOwner}
        isCommunityUser={entityType === PROVIDER_ENTITY_TYPE_COMMUNITY}
        isQuestionnaireAlreadyFilled={isQuestionnaireAlreadyFilled}
      />
    );
  }
}
