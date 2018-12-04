import { reduxForm } from 'redux-form';

import CommunitySATContactForm from 'sly/components/organisms/CommunitySATContactForm';
import { createValidator, required, usPhone } from 'sly/services/validation';

const validate = createValidator({
  name: [required],
  phone: [required, usPhone],
});

export default reduxForm({
  validate,
  form: 'SATWizardForm',
  destroyOnUnmount: false,
})(CommunitySATContactForm);
