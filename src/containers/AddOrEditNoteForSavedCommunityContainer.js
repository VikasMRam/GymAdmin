import React, { Component } from 'react';
import { object, func, bool } from 'prop-types';
import { SubmissionError } from 'redux-form';
import produce from 'immer';

import { withApi } from 'sly/services/newApi';
import { WizardController, WizardStep, WizardSteps } from 'sly/services/wizard';
import { community as communityPropType } from 'sly/propTypes/community';
import SaveCommunityFormContainer from 'sly/containers/SaveCommunityFormContainer';
import ConfirmationDialog from 'sly/components/molecules/ConfirmationDialog';

@withApi()

class AddOrEditNoteForSavedCommunityContainer extends Component {
  static propTypes = {
    user: object,
    api: object,
    community: communityPropType,
    onComplete: func,
    onCancel: func,
    rawUserSave: object,
    userSave: object,
    isEditMode: bool,
    initialValues: object,
  };

  handleSubmitSaveCommunityForm = (data) => {
    const {
      api, onComplete, userSave, rawUserSave,
    } = this.props;
    const { id } = userSave;

    // todo new clear submit with dispatch clearSubmitErrors();
    return api.updateUserSave({ id }, {
      data: produce(rawUserSave, (draft) => {
        draft.attributes.info.note = data.note;
      }),
    })
      .catch((r) => {
        // TODO: Need to set a proper way to handle server side errors
        const { body } = r;
        const errorMessage = body.errors.map(e => e.title).join('. ');
        throw new SubmissionError({ _error: errorMessage });
      })
      .then(onComplete);
  };

  render() {
    const { handleSubmitSaveCommunityForm } = this;
    const {
      community, onCancel, isEditMode, initialValues,
    } = this.props;
    const { name } = community;

    return (
      <WizardController
        formName="AddOrEditNoteForm"
      >
        {({
          data, next, previous, ...props
        }) => (
          <WizardSteps {...props}>
            <WizardStep
              component={SaveCommunityFormContainer}
              name="Note"
              onSubmit={data => handleSubmitSaveCommunityForm(data)}
              heading={`${isEditMode ? 'Edit' : 'Add'} note about ${name}`}
              hasCancel
              onCancelClick={next}
              destroyOnUnmount={false}
              initialValues={initialValues}
            />
            <WizardStep
              component={ConfirmationDialog}
              name="Discard"
              heading="Discard Note"
              description="You can’t undo this, and you'll lose any unsaved changes."
              confirmButtonText="Yes, Discard"
              onCancelClick={previous}
              onConfirmClick={onCancel}
            />
          </WizardSteps>
        )}
      </WizardController>
    );
  }
}

export default AddOrEditNoteForSavedCommunityContainer;
