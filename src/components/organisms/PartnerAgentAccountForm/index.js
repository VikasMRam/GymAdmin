import React from 'react';
import { Field } from 'redux-form';

import ReduxField from 'sly/components/organisms/ReduxField';
import FormSection from 'sly/components/molecules/FormSection';
import { phoneParser, phoneFormatter } from 'sly/services/helpers/phone';

const PartnerAgentAccountForm = ({ ...props }) => (
  <FormSection heading="Edit Account" buttonText="Save" {...props}>
    <Field
      name="region"
      label="Region"
      type="text"
      placeholder=""
      component={ReduxField}
      wideWidth
    />
    <Field
      name="imageCaption"
      label="Referral Agent Image Caption"
      type="text"
      placeholder=""
      component={ReduxField}
      wideWidth
    />
    <Field
      name="cv"
      label="Referral Agent Free Form"
      type="textarea"
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
    <Field
      name="displayName"
      label="Display name"
      type="text"
      placeholder=""
      component={ReduxField}
      wideWidth
    />
    <Field
      name="chosenReview"
      label="RA Chosen Review"
      type="textarea"
      placeholder=""
      component={ReduxField}
      wideWidth
    />
    <Field
      name="slyPhone"
      label="RA Twilio Phone"
      placeholder=""
      parse={phoneParser}
      format={phoneFormatter}
      component={ReduxField}
      wideWidth
    />
    <Field
      name="vacation"
      label="RA Vacation"
      type="daterange"
      placeholder=""
      component={ReduxField}
      wideWidth
    />
  </FormSection>
);

export default PartnerAgentAccountForm;
