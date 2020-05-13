import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import CommunityPricingWizardWhatToDoNextForm from 'sly/web/components/organisms/CommunityPricingWizardWhatToDoNextForm';
import { WHAT_TO_NEXT_OPTIONS } from 'sly/web/constants/pricingForm';

const CommunityPWEstimatedPricingFormContainer = reduxForm({
  form: 'CommunityPricingWizardWhatToDoNextForm',
  destroyOnUnmount: false,
})(CommunityPricingWizardWhatToDoNextForm);

const defaultProps = {
  onSubmit: action('onSubmit'),
  onInterestChange: action('onInterestChange'),
  listOptions: WHAT_TO_NEXT_OPTIONS,
};

storiesOf('Organisms|CommunityPricingWizardWhatToDoNextForm', module)
  .add('default', () => (
    <CommunityPWEstimatedPricingFormContainer {...defaultProps} />
  ));
