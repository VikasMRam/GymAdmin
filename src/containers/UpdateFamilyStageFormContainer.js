import React, { Component } from 'react';
import { object, func } from 'prop-types';
import immutable from 'object-path-immutable';
import pick from 'lodash/pick';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { query } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import { FAMILY_STATUS_ACTIVE, NOTE_COMMENTABLE_TYPE_CLIENT } from 'sly/constants/familyDetails';
import { NOTE_RESOURCE_TYPE } from 'sly/constants/resourceTypes';
import { createValidator, required } from 'sly/services/validation';
import { getStageDetails } from 'sly/services/helpers/stage';
import UpdateFamilyStageForm from 'sly/components/organisms/UpdateFamilyStageForm';

const validate = createValidator({
  stage: [required],
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

@connect(mapStateToProps)

class UpdateFamilyStageFormContainer extends Component {
  static propTypes = {
    client: clientPropType,
    rawClient: object,
    notifyError: func.isRequired,
    notifyInfo: func.isRequired,
    updateClient: func.isRequired,
    createNote: func.isRequired,
    onSuccess: func,
    formState: object,
  };

  currentStage = {};
  nextStage = {};

  handleUpdateStage = (data) => {
    const { currentStage, nextStage } = this;
    const {
      updateClient, client, rawClient, notifyError, notifyInfo, onSuccess, createNote,
    } = this.props;
    const { id } = client;
    const { stage, note } = data;
    let notePromise = () => Promise.resolve();
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
    }

    const newClient = immutable(pick(rawClient, ['id', 'type', 'attributes.status', 'attributes.stage']))
      .set('attributes.status', FAMILY_STATUS_ACTIVE)
      .set('attributes.stage', stage)
      .value();

    return updateClient({ id }, newClient)
      .then(notePromise)
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
    const { client, formState } = this.props;
    const { clientInfo, stage } = client;
    const { name } = clientInfo;
    let nextStageGroup;
    let levelGroup;
    let showRejectOption;
    let nextStage;
    if (formState) {
      this.currentStage = getStageDetails(stage);
      ({ levelGroup, showRejectOption } = this.currentStage);
      ({ stage: nextStage } = formState);
      this.nextStage = getStageDetails(nextStage);
      ({ levelGroup: nextStageGroup } = this.nextStage);
    }
    const initialValues = {
      stage,
    };

    return (
      <ReduxForm
        {...this.props}
        initialValues={initialValues}
        currentStageGroup={levelGroup}
        nextStageGroup={nextStageGroup}
        nextStage={nextStage}
        name={name}
        onSubmit={handleUpdateStage}
        showRejectOption={showRejectOption}
      />
    );
  }
}

export default UpdateFamilyStageFormContainer;
