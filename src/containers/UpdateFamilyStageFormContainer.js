import React, { Component } from 'react';
import { object, func } from 'prop-types';
import produce from 'immer';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { query } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import {
  createValidator,
  required,
} from 'sly/services/validation';
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

@connect(mapStateToProps)

class UpdateFamilyStageFormContainer extends Component {
  static propTypes = {
    client: clientPropType,
    rawClient: object,
    notifyError: func.isRequired,
    notifyInfo: func.isRequired,
    updateClient: func,
    onSuccess: func,
    formState: object,
  };

  currentStage = {};
  nextStage = {};

  handleUpdateStage = (data) => {
    const { currentStage, nextStage } = this;
    const {
      updateClient, client, rawClient, notifyError, notifyInfo, onSuccess,
    } = this.props;
    const { id } = client;
    const { stage } = data;

    return updateClient({ id }, produce(rawClient, (draft) => {
      draft.attributes.stage = stage;
    }))
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
    if (formState) {
      this.currentStage = getStageDetails(stage);
      ({ levelGroup, showRejectOption } = this.currentStage);
      const { stage: nextStage } = formState;
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
        name={name}
        onSubmit={handleUpdateStage}
        showRejectOption={showRejectOption}
      />
    );
  }
}

export default UpdateFamilyStageFormContainer;
