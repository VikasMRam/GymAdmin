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
    <CommunityPWEstimatedPricingFormContainer onRoomTypeChange={action('room type changed')} onCareTypeChange={action('care type changed')} />
  ))
  .add('with medicaidCoverage', () => (
    <CommunityPWEstimatedPricingFormContainer userDetails={{ medicaidCoverage: 'no' }} onRoomTypeChange={action('room type changed')} onCareTypeChange={action('care type changed')} />
  ));
