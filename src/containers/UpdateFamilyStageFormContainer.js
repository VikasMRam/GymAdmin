import React, { Component } from 'react';
import { object, func, arrayOf, string } from 'prop-types';
import immutable from 'object-path-immutable';
import pick from 'lodash/pick';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

import { query, getRelationship, invalidateRequests } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import { FAMILY_STATUS_ACTIVE, FAMILY_STATUS_ON_HOLD, NOTE_COMMENTABLE_TYPE_CLIENT, FAMILY_STAGE_WON } from 'sly/constants/familyDetails';
import { NOTE_RESOURCE_TYPE } from 'sly/constants/resourceTypes';
import { createValidator, required, mmDdYyyyy, float } from 'sly/services/validation';
import { getStageDetails } from 'sly/services/helpers/stage';
import UpdateFamilyStageForm from 'sly/components/organisms/UpdateFamilyStageForm';

const validate = createValidator({
  stage: [required],
  moveInDate: [required, mmDdYyyyy],
  communityName: [required],
  monthlyFees: [required, float],
  referralAgreement: [required, float],
  lossReason: [required],
  lostDescription: [required],
  preferredLocation: [required],
});

const ReduxForm = reduxForm({
  form: 'UpdateFamilyStageForm',
  validate,
})(UpdateFamilyStageForm);

const mapStateToProps = state => ({
  formState: state.form && state.form.UpdateFamilyStageForm ? state.form.UpdateFamilyStageForm.values : {},
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
  };

  currentStage = {};
  nextStage = {};

  handleUpdateStage = (data) => {
    const { currentStage, nextStage } = this;
    const {
      updateClient, client, rawClient, notifyError, notifyInfo, onSuccess, createNote,
      updateUuidAux, uuidAux, refetchClient, refetchNotes, invalidateClients,
    } = this.props;
    const { id, clientInfo } = client;
    const {
      stage, note, moveInDate, communityName, monthlyFees, referralAgreement, lossReason, lostDescription,
      preferredLocation,
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
    if (stage === FAMILY_STAGE_WON) {
      const { name } = clientInfo;
      const note = `${name} moved into ${communityName} on ${moveInDate} with Monthly Rent of ${monthlyFees} and a referral fee % from the community of ${referralAgreement}`;
      const title = 'Status Change';
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
      const dateParts = moveInDate.split('-');
      const moveInDateObj = Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]);
      const parsedDate = dayjs(moveInDateObj);
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
    if (preferredLocation) {
      const [city, state] = preferredLocation.split(',');
      const locationInfo = {
        city,
        state,
      };
      const { id: uuidID } = uuidAux;
      newUuidAux.set('attributes.uuidInfo.locationInfo', locationInfo);
      newUuidAux = newUuidAux.value();
      uuidAuxPromise = () => updateUuidAux({ id: uuidID }, newUuidAux);
    }
    newClient = newClient.value();

    return updateClient({ id }, newClient)
      .then(uuidAuxPromise)
      .then(notePromise)
      .then(clientPromise)
      .then(getNotesPromise)
      .then(invalidateClients)
      .then(() => {
        let msg = 'Family stage updated';
        if (currentStage.levelGroup !== nextStage.levelGroup) {
          msg += ` and moved to ${nextStage.levelGroup}`;
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
        notifyError('Failed to update stage. Please try again.');
      });
  };

  render() {
    const { handleUpdateStage } = this;
    const { client, formState, lossReasons } = this.props;
    const { clientInfo, stage, status } = client;
    const isPaused = status === FAMILY_STATUS_ON_HOLD;
    const { name } = clientInfo;
    let nextStageGroup;
    let levelGroup;
    let showRejectOption;
    let nextStage;
    let currentLossReason;
    if (formState) {
      this.currentStage = getStageDetails(stage);
      ({ levelGroup, showRejectOption } = this.currentStage);
      ({ stage: nextStage, lossReason: currentLossReason } = formState);
      this.nextStage = getStageDetails(nextStage);
      ({ levelGroup: nextStageGroup } = this.nextStage);
    }

    return (
      <ReduxForm
        {...this.props}
        currentStageGroup={levelGroup}
        nextStageGroup={nextStageGroup}
        nextStage={nextStage}
        name={name}
        onSubmit={handleUpdateStage}
        showRejectOption={showRejectOption}
        lossReasons={lossReasons}
        currentLossReason={currentLossReason}
        isPaused={isPaused}
      />
    );
  }
}
