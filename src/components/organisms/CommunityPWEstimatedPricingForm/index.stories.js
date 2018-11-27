import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import CommunityPWEstimatedPricingForm from 'sly/components/organisms/CommunityPWEstimatedPricingForm';

const CommunityPWEstimatedPricingFormContainer = reduxForm({
  form: 'CommunityPWEstimatedPricingForm',
  destroyOnUnmount: false,
})(CommunityPWEstimatedPricingForm);

storiesOf('Organisms|CommunityPWEstimatedPricingForm', module)
  .add('default', () => (
    <CommunityPWEstimatedPricingFormContainer />
  ));
