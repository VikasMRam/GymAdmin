import React from 'react';
import { string, func, bool } from 'prop-types';
import { Field } from 'redux-form';

import { Span } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';
import ThreeSectionFormTemplate from 'sly/components/molecules/ThreeSectionFormTemplate';

const ConfirmReasonForm = ({
  name, message, title, handleSubmit, onCancel, ...props
}) => (
  <ThreeSectionFormTemplate {...props} onSubmit={handleSubmit} hasCancel hasSubmit heading={title} onCancelClick={onCancel}>
    <Field
      name="reason"
      label={<span>Reason<Span palette="danger">*</Span></span>}
      type="textarea"
      placeholder={message}
      component={ReduxField}
    />
  </ThreeSectionFormTemplate>
);

ConfirmReasonForm.propTypes = {
  name: string.isRequired,
  message: string,
  title: string,
  withReason: bool,
  onAgree: func,
  onCancel: func,
  handleSubmit: func,
};

export default ConfirmReasonForm;
