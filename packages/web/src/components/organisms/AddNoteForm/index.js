import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { Block } from 'sly/web/components/atoms';
import ThreeSectionFormTemplate from 'sly/web/components/molecules/ThreeSectionFormTemplate';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const AddNoteForm = ({
  submitting, handleSubmit, error, onCancelClick,  heading, submitButtonText, placeholder, label, ...props
}) => (
  <ThreeSectionFormTemplate
    {...props}
    hasSubmit
    noFooter
    onSubmit={handleSubmit}
    heading={heading}
    submitButtonText={submitButtonText}
    topRightIcon="close"
    topRightIconOnClick={onCancelClick}
  >
    <Block padding="m">
      <Field
        type="textarea"
        rows={3}
        name="note"
        label={label}
        placeholder={placeholder}
        component={ReduxField}
      />
    </Block>
    {error && <Block palette="danger">{error}</Block>}
  </ThreeSectionFormTemplate>
);

AddNoteForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  error: string,
  onCancelClick: func,
  heading: string,
  submitButtonText: string,
  cancelButtonText: string,
  label: string,
  placeholder: string,
};

AddNoteForm.defaultProps = {
  label: 'Add an optional note',
  submitButtonText: 'Add Note',
};

export default AddNoteForm;
