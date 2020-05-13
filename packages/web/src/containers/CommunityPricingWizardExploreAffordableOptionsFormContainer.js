import { reduxForm } from 'redux-form';

import CommunityPricingWizardExploreAffordableOptionsForm
  from 'sly/web/components/organisms/CommunityPricingWizardExploreAffordableOptionsForm';

export default reduxForm({
  form: 'CommunityPricingWizardExploreAffordableOptionsForm',
  destroyOnUnmount: false,
})(CommunityPricingWizardExploreAffordableOptionsForm);

