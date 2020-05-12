import { reduxForm } from 'redux-form';

import CommunityPricingWizardWhatToDoNextForm
  from 'sly/web/components/organisms/CommunityPricingWizardWhatToDoNextForm';

export default reduxForm({
  form: 'PricingWizardWhatToDoNextForm',
})(CommunityPricingWizardWhatToDoNextForm);

