import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import CommunityPricingWizardExploreAffordableOptionsForm
  from 'sly/components/organisms/CommunityPricingWizardExploreAffordableOptionsForm';
import { EXPLORE_AFFORDABLE_PRICING_OPTIONS } from 'sly/constants/pricingForm';

const CommunityPricingWizardExploreAffordableOptionsFormContainer = reduxForm({
  form: 'CommunityPricingWizardWhatToDoNextForm',
  destroyOnUnmount: false,
})(CommunityPricingWizardExploreAffordableOptionsForm);

const defaultProps = {
  onSubmit: action('onSubmit'),
  onBudgetChange: action('onBudgetChange'),
  listOptions: EXPLORE_AFFORDABLE_PRICING_OPTIONS,
};

storiesOf('Organisms|CommunityPricingWizardExploreAffordableOptionsForm', module)
  .add('default', () => (
    <CommunityPricingWizardExploreAffordableOptionsFormContainer {...defaultProps} />
  ));
