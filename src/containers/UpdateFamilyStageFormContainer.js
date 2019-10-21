import React, { Component } from 'react';
import { object, func, arrayOf, string } from 'prop-types';
import immutable from 'object-path-immutable';
import pick from 'lodash/pick';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

import { query, getRelationship, invalidateRequests } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import userPropType from 'sly/propTypes/user';
import {
  FAMILY_STATUS_ACTIVE,
  FAMILY_STATUS_ON_PAUSE,
  FAMILY_STAGE_WON,
  FAMILY_STAGE_LOST,
  ROOM_TYPES,
} from 'sly/constants/familyDetails';
import { NOTE_COMMENTABLE_TYPE_CLIENT } from 'sly/constants/notes';
import { NOTE_RESOURCE_TYPE } from 'sly/constants/resourceTypes';
import { createValidator, required, float } from 'sly/services/validation';
import { getStageDetails } from 'sly/services/helpers/stage';
import UpdateFamilyStageForm from 'sly/components/organisms/UpdateFamilyStageForm';
import SlyEvent from 'sly/services/helpers/events';

const validate = createValidator({
  stage: [required],
  moveInDate: [required],
  communityName: [required],
  monthlyFees: [required, float],
  referralAgreementType: [required],
  referralAgreement: [required],
  lossReason: [required],
  lostDescription: [required],
  preferredLocation: [required],
});

const ReduxForm = reduxForm({
  form: 'UpdateFamilyStageForm',
  validate,
})(UpdateFamilyStageForm);

const mapStateToProps = state => ({
  formState: state.form && state.form.UpdateFamilyStageForm ? state.form.UpdateFamilyStageForm.values : null,
});

@query('updateClient', 'updateClient')

@query('createNote', 'createNote')

@query('updateUuidAux', 'updateUuidAux')

@connect(mapStateToProps)

@connect((state, props) => ({
  uuidAux: getRelationship(state, props.rawClient, 'uuidAux'),
}))

@connect(null, (dispatch, { api }) => ({
  invalidateClients: () => dispatch(invalidateRequests(api.getClients)),
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
    currentLossReason: string,
    updateUuidAux: func.isRequired,
    uuidAux: object,
    refetchClient: func.isRequired,
    refetchNotes: func.isRequired,
    invalidateClients: func,
    user: userPropType,
  };

  currentStage = {};
  nextStage = {};

  handleUpdateStage = (data) => {
    const { currentStage, nextStage } = this;
    const {
      updateClient, client, rawClient, notifyError, notifyInfo, onSuccess, createNote,
      updateUuidAux, uuidAux, refetchClient, refetchNotes, invalidateClients,
    } = this.props;
    const { id, clientInfo, stage: previousStage } = client;
    const {
      stage, note, moveInDate, communityName, monthlyFees, referralAgreement, lossReason, lostDescription,
      preferredLocation, referralAgreementType, invoiceAmount, invoiceNumber, invoicePaid, roomType,
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
      let note = `${name} moved into ${communityName} on ${moveInDateFormatted} with a monthly rent of $${monthlyFees} and a referral fee of ${referralAgreement}% referral fee `;
      const title = 'Stage Change';
      if (stage === FAMILY_STAGE_LOST) {
        let reason = lossReason;
        if (lostDescription) {
          reason = lostDescription;
        } else if (preferredLocation) {
          reason = `${lossReason}. Preferred in: ${preferredLocation}`;
        }
        note = `Stage changed from ${previousStage} to ${stage}. Lost Reason: ${reason}`;
      }
      const payload = {
        type: NOTE_RESOURCE_TYPE,
        attributes: {
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

    let newUuidAux = immutable(pick(uuidAux, ['id', 'type', 'attributes.uuidInfo', 'attributes.uuid']));
    let newClient = immutable(pick(rawClient, ['id', 'type', 'attributes.status', 'attributes.stage', 'attributes.clientInfo']))
      .set('attributes.status', FAMILY_STATUS_ACTIVE)
      .set('attributes.stage', stage);
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
    newClient.set('attributes.clientInfo.referralAgreementType', referralAgreementType);
    if (referralAgreementType === 'percentage') {
      const moveInFee = referralAgreement * monthlyFees * 0.01;
      newClient.set('attributes.clientInfo.moveInFee', parseFloat(moveInFee));
    } else if (referralAgreementType === 'flat-fee') {
      newClient.set('attributes.clientInfo.moveInFee', parseFloat(referralAgreement));
    }
    const shouldUpdateUuidAux = preferredLocation;
    if (preferredLocation) {
      const [city, state] = preferredLocation.split(',');
      const locationInfo = {
        city,
        state,
      };
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
      .then(invalidateClients)
      .then(() => {
        let msg = 'Family stage updated';
        if (currentStage.group !== nextStage.group) {
          msg += ` and moved to ${nextStage.group}`;
        }
        notifyInfo(msg);
        if (onSuccess) {
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
    const { handleUpdateStage } = this;
    const {
      client, formState, lossReasons,
    } = this.props;
    const { clientInfo, stage, status } = client;
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
      invoicePaid: existingInvoicePaid,
      lossReason: existingLossReason,
    } = clientInfo;
    let nextGroup;
    let group;
    let nextStage;
    let currentLossReason;
    let referralAgreementType;
    let referralAgreement;
    let monthlyFees;
    if (formState) {
      this.currentStage = getStageDetails(stage);
      ({ group } = this.currentStage);
      ({
        stage: nextStage, lossReason: currentLossReason, referralAgreementType, referralAgreement, monthlyFees,
      } = formState);
      this.nextStage = getStageDetails(nextStage);
      ({ group: nextGroup } = this.nextStage);
    }
    const initialValues = {
      stage,
      moveInDate: existingMoveInDate ? new Date(existingMoveInDate) : null,
      communityName: existingCommunityName,
      roomType: existingMoveRoomType,
      referralAgreement: existingReferralAgreement ? existingReferralAgreement.toString() : null,
      referralAgreementType: existingReferralAgreementType,
      monthlyFees: existingMonthlyFees ? existingMonthlyFees.toString() : null,
      invoiceAmount: existingInvoiceAmount ? existingInvoiceAmount.toString() : null,
      invoiceNumber: existingInvoiceNumber,
      invoicePaid: existingInvoicePaid,
      lossReason: existingLossReason,
    };

    return (
      <ReduxForm
        {...this.props}
        currentStageGroup={group}
        currentStage={stage}
        nextStageGroup={nextGroup}
        nextStage={nextStage}
        name={name}
        onSubmit={handleUpdateStage}
        lossReasons={lossReasons}
        currentLossReason={currentLossReason}
        isPaused={isPaused}
        initialValues={initialValues}
        referralAgreementType={referralAgreementType}
        referralAgreement={referralAgreement}
        monthlyFees={monthlyFees}
        roomTypes={ROOM_TYPES}
      />
    );
  }
}
