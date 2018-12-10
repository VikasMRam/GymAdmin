import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import CommunityPricingWizardWhatToDoNextForm from 'sly/components/organisms/CommunityPricingWizardWhatToDoNextForm';

const CommunityPWEstimatedPricingFormContainer = reduxForm({
  form: 'CommunityPricingWizardWhatToDoNextForm',
  destroyOnUnmount: false,
})(CommunityPricingWizardWhatToDoNextForm);

const defaultProps = {
  communityName: 'Rhoda Goldman Plaza',
  estimatedPrice: 3600,
  onOptionClick: action('onOptionClick'),
};

storiesOf('Organisms|CommunityPricingWizardWhatToDoNextForm', module)
  .add('default', () => (
    <CommunityPWEstimatedPricingFormContainer {...defaultProps} />
  ));
