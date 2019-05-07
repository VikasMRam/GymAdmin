import React, { Component } from 'react';
import { object, func, bool } from 'prop-types';
import { SubmissionError } from 'redux-form';
import produce from 'immer';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { query } from 'sly/services/newApi';
import { WizardController, WizardStep, WizardSteps } from 'sly/services/wizard';
import { community as communityPropType } from 'sly/propTypes/community';
import AddNoteFormContainer from 'sly/containers/AddNoteFormContainer';
import ConfirmationDialog from 'sly/components/molecules/ConfirmationDialog';

const StyledConfirmationDialog = styled(ConfirmationDialog)`
  padding: ${size('spacing.xxLarge')};
`;

@query('updateUserSave', 'updateUserSave')

class AddOrEditNoteForSavedCommunityContainer extends Component {
  static propTypes = {
    user: object,
    updateUserSave: func,
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
      updateUserSave, onComplete, userSave, rawUserSave,
    } = this.props;
    const { id } = userSave;

    // todo new clear submit with dispatch clearSubmitErrors();
    return updateUserSave({ id }, produce(rawUserSave, (draft) => {
      draft.attributes.info.note = data.note;
    }))
      .then(onComplete)
      .catch((r) => {
        // TODO: Need to set a proper way to handle server side errors
        const { body } = r;
        const errorMessage = body.errors.map(e => e.title).join('. ');
        throw new SubmissionError({ _error: errorMessage });
      });
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
              component={AddNoteFormContainer}
              name="Note"
              placeholder="What are some things about this community that you like..."
              onSubmit={data => handleSubmitSaveCommunityForm(data)}
              heading={`${isEditMode ? 'Edit' : 'Add'} note about ${name}`}
              hasCancel
              onCancelClick={next}
              destroyOnUnmount={false}
              initialValues={initialValues}
            />
            <WizardStep
              component={StyledConfirmationDialog}
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
