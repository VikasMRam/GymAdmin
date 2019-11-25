import React from 'react';
import { func, string, object } from 'prop-types';
import { Field } from 'redux-form';
import ReduxField from 'sly/components/organisms/ReduxField';
import ThreeSectionFormTemplate from 'sly/components/molecules/ThreeSectionFormTemplate';
import { phoneFormatter, phoneParser } from 'sly/services/helpers/phone';

const AddContactForm = ({ handleSubmit, onCancel, heading, initialValues, ...props }) => {
  const isEditMode = initialValues.created_at;

  return (
    <ThreeSectionFormTemplate
      {...props}
      hasCancel
      onCancelClick={onCancel}
      hasSubmit
      onSubmit={handleSubmit}
      heading={heading}
      submitButtonText={isEditMode ? 'Update Contact' : 'Add Contact'}
      cancelButtonText={isEditMode && 'Back'}
    >
      <Field name="name" label="Contact name" type="text" component={ReduxField} required />
      <Field name="email" label="Email" type="email" component={ReduxField} required />
      <Field
        name="mobilePhone"
        label="Phone number"
        parse={phoneParser}
        format={phoneFormatter}
        required
        component={ReduxField}
      />
      <Field name="community.name" label="Community" type="text" component={ReduxField} disabled />
    </ThreeSectionFormTemplate>
  );
};

AddContactForm.propTypes = {
  handleSubmit: func.isRequired,
  onCancel: func.isRequired,
  heading: string.isRequired,
  initialValues: object,
};

export default AddContactForm;
