import { reduxForm } from 'redux-form';

import CommunityPWEstimatedPricingForm from 'sly/components/organisms/CommunityPWEstimatedPricingForm';
import { createValidator, required } from 'sly/services/validation';

const validate = createValidator({
  roomType: [required],
  careType: [required],
  medicaidCoverage: [required],
});

export default reduxForm({
  validate,
  form: 'PWizardForm',
  destroyOnUnmount: false,
})(CommunityPWEstimatedPricingForm);
