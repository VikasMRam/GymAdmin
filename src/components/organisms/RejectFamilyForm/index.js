import React from 'react';
import { string, func, arrayOf } from 'prop-types';
import { Field } from 'redux-form';

import { Span } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';
import ThreeSectionFormTemplate from 'sly/components/molecules/ThreeSectionFormTemplate';

const RejectFamilyForm = ({
  handleSubmit, onCancel, reasons, ...props
}) => (
  <ThreeSectionFormTemplate {...props} hasCancel onCancelClick={onCancel} hasSubmit onSubmit={handleSubmit} heading="Reject lead" submitButtonText="Confirm">
    <Field
      name="reason"
      label={<span>Select a reason<Span palette="danger">*</Span></span>}
      type="select"
      component={ReduxField}
      value=""
    >
      <option value="" disabled>Select rejection reason</option>
      {reasons.map(r => <option key={r} value={r}>{r}</option>)}
    </Field>
  </ThreeSectionFormTemplate>
);

RejectFamilyForm.propTypes = {
  handleSubmit: func,
  onCancel: func,
  reasons: arrayOf(string).isRequired,
};

export default RejectFamilyForm;
