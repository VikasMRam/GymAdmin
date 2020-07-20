import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import { withPreventDefault } from 'sly/web/services/helpers/forms';
import PartnerAgentProfileForm from 'sly/web/components/organisms/PartnerAgentProfileForm';
import agent from 'sly/storybook/sample-data/agent-linda-iwamota.json';

const { info, status } = agent;
const { bio, parentCompany, displayName, cv, imageCaption, chosenReview, serviceArea } = info;
const { adminRegion, adminNotes, slyScore } = info;
let zipcodesServed = null;
if (serviceArea) {
  ({ zipcodesServed } = serviceArea);
}
const initialValues = { bio, parentCompany, displayName, cv, imageCaption, chosenReview, adminRegion, zipcodesServed, status, adminNotes, slyScore };

const PartnerAgentProfileFormContainer = reduxForm({
  form: 'PartnerAgentProfileForm',
})(PartnerAgentProfileForm);

storiesOf('Organisms|PartnerAgentProfileForm', module)
  .add('default', () => (
    <PartnerAgentProfileFormContainer
      initialValues={initialValues}
      handleSubmit={withPreventDefault(action('form submitted'))}
    />
  ))
  .add('admin', () => (
    <PartnerAgentProfileFormContainer
      initialValues={initialValues}
      isSlyAdmin
      handleSubmit={withPreventDefault(action('form submitted'))}
    />
  ));
