import { reduxForm } from 'redux-form';

import CommunityBookATourContactForm from 'sly/components/organisms/CommunityBookATourContactForm';
import { createValidator, required, usPhone, email } from 'sly/services/validation';

const validate = createValidator({
  name: [required],
  email: [email],
  phone: [required, usPhone],
});

export default reduxForm({
  validate,
  form: 'BookATourWizardForm',
  destroyOnUnmount: false,
})(CommunityBookATourContactForm);
