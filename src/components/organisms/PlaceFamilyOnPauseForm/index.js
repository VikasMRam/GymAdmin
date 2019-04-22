import React from 'react';
import { string, func } from 'prop-types';
import { Field } from 'redux-form';

import { Span } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';
import ThreeSectionFormTemplate from 'sly/components/molecules/ThreeSectionFormTemplate';

const PlaceFamilyOnPauseForm = ({
  name, onCancel, handleSubmit, ...props
}) => (
  <ThreeSectionFormTemplate {...props} onSubmit={handleSubmit} hasCancel hasSubmit heading={`Place ${name} on Pause`} onCancelClick={onCancel}>
    <Field
      name="reason"
      label={<span>Reason<Span palette="danger">*</Span></span>}
      type="textarea"
      placeholder="Please write a reason why you are putting this family on Pause..."
      component={ReduxField}
    />
  </ThreeSectionFormTemplate>
);

PlaceFamilyOnPauseForm.propTypes = {
  name: string.isRequired,
  onCancel: func,
  handleSubmit: func,
};

export default PlaceFamilyOnPauseForm;
