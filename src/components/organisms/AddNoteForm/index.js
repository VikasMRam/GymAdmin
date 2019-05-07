import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { Block } from 'sly/components/atoms';
import ThreeSectionFormTemplate from 'sly/components/molecules/ThreeSectionFormTemplate';
import ReduxField from 'sly/components/organisms/ReduxField';

const SaveCommunityForm = ({
  submitting, handleSubmit, error, onCancelClick, hasCancel, heading, submitButtonText, cancelButtonText, placeholder, ...props
}) => (
  <ThreeSectionFormTemplate
    {...props}
    hasCancel={hasCancel}
    onCancelClick={onCancelClick}
    hasSubmit
    onSubmit={handleSubmit}
    heading={heading}
    submitButtonText={submitButtonText}
    cancelButtonText={cancelButtonText}
  >
    <Field
      showCharacterCount
      type="textarea"
      rows={3}
      maxLength={200}
      name="note"
      label="Add a note (optional)"
      placeholder={placeholder}
      component={ReduxField}
    />
    {error && <Block palette="danger">{error}</Block>}
  </ThreeSectionFormTemplate>
);

SaveCommunityForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  error: string,
  onCancelClick: func,
  hasCancel: bool,
  heading: string,
  submitButtonText: string.isRequired,
  cancelButtonText: string.isRequired,
  placeholder: string,
};

SaveCommunityForm.defaultProps = {
  submitButtonText: 'Save Note',
  cancelButtonText: 'Done',
};

export default SaveCommunityForm;
