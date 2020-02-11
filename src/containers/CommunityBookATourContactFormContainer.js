import { reduxForm } from 'redux-form';

import CommunityBookATourContactForm from 'sly/components/organisms/CommunityBookATourContactForm';
import { createValidator, required, usPhone, email } from 'sly/services/validation';

const validate = createValidator({
  name: [required],
  email: [email],
  phone: [required, usPhone],
});

const initialValues = {
  name: '',
  email: '',
  phone: '',
};

export default reduxForm({
  validate,
  initialValues,
  form: 'BookATourWizardForm',
  destroyOnUnmount: false,
})(CommunityBookATourContactForm);
