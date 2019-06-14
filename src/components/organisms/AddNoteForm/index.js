import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { Block } from 'sly/components/atoms';
import ThreeSectionFormTemplate from 'sly/components/molecules/ThreeSectionFormTemplate';
import ReduxField from 'sly/components/organisms/ReduxField';

const AddNoteForm = ({
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
      type="textarea"
      rows={3}
      name="note"
      label="Add a note (optional)"
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
  placeholder: string,
};

AddNoteForm.defaultProps = {
  submitButtonText: 'Save Note',
  cancelButtonText: 'Dismiss',
};

export default AddNoteForm;
