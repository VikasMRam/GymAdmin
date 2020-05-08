import { reduxForm } from 'redux-form';

import CommunityPricingWizardWhatToDoNextForm
  from 'sly/components/organisms/CommunityPricingWizardWhatToDoNextForm';

export default reduxForm({
  form: 'PricingWizardWhatToDoNextForm',
})(CommunityPricingWizardWhatToDoNextForm);

