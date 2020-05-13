import { reduxForm } from 'redux-form';

import CommunityBookATourContactForm from 'sly/web/components/organisms/CommunityBookATourContactForm';
import { createValidator, required, usPhone, email } from 'sly/web/services/validation';

const validate = createValidator({
  name: [required],
  email: [email],
  phone: [required, usPhone],
});

const initialValues = {
  name: '',
};

export default reduxForm({
  validate,
  initialValues,
  form: 'BookATourWizardForm',
  destroyOnUnmount: false,
})(CommunityBookATourContactForm);
