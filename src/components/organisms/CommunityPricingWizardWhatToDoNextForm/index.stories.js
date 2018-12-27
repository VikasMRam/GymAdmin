import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import CommunityPricingWizardWhatToDoNextForm from 'sly/components/organisms/CommunityPricingWizardWhatToDoNextForm';
import { WHAT_TO_NEXT_OPTIONS } from 'sly/constants/pricingForm';

const CommunityPWEstimatedPricingFormContainer = reduxForm({
  form: 'CommunityPricingWizardWhatToDoNextForm',
  destroyOnUnmount: false,
})(CommunityPricingWizardWhatToDoNextForm);

const defaultProps = {
  communityName: 'Rhoda Goldman Plaza',
  estimatedPrice: 3600,
  onSubmit: action('onSubmit'),
  onInterestChange: action('onInterestChange'),
  listOptions: WHAT_TO_NEXT_OPTIONS,
};

storiesOf('Organisms|CommunityPricingWizardWhatToDoNextForm', module)
  .add('default', () => (
    <CommunityPWEstimatedPricingFormContainer {...defaultProps} />
  ));