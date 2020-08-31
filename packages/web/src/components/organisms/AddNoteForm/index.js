import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { Block } from 'sly/web/components/atoms';
import ThreeSectionFormTemplate from 'sly/web/components/molecules/ThreeSectionFormTemplate';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const AddNoteForm = ({
  submitting, handleSubmit, error, onCancelClick, hasCancel, heading, submitButtonText, cancelButtonText, placeholder, label, ...props
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
      type="textarea"
      rows={3}
      name="note"
      label={label}
      placeholder={placeholder}
      component={ReduxField}
    />
    {error && <Block palette="danger">{error}</Block>}
  </ThreeSectionFormTemplate>
);

AddNoteForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  error: string,
  onCancelClick: func,
  hasCancel: bool,
  heading: string,
  submitButtonText: string.isRequired,
  cancelButtonText: string.isRequired,
  label: string,
  placeholder: string,
};

AddNoteForm.defaultProps = {
  label: 'Add a note (optional)',
  submitButtonText: 'Save Note',
  cancelButtonText: 'Cancel',
};

export default AddNoteForm;
