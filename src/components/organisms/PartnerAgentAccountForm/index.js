import React from 'react';
import { Field } from 'redux-form';

import ReduxField from 'sly/components/organisms/ReduxField';
import FormSection from 'sly/components/molecules/FormSection';

const PartnerAgentAccountForm = ({ ...props }) => (
  <FormSection heading="Edit Account" buttonText="Save" {...props}>
    <Field
      name="displayName"
      label="Display name"
      type="text"
      placeholder=""
      component={ReduxField}
      wideWidth
    />
    <Field
      name="bio"
      label="Bio"
      type="textarea"
      placeholder=""
      component={ReduxField}
      wideWidth
    />
  </FormSection>
);

export default PartnerAgentAccountForm;
