import { reduxForm } from 'redux-form';

import CommunityPWEstimatedPricingForm from 'sly/web/components/organisms/CommunityPWEstimatedPricingForm';

export default reduxForm({
  form: 'PWizardForm',
  destroyOnUnmount: false,
})(CommunityPWEstimatedPricingForm);
