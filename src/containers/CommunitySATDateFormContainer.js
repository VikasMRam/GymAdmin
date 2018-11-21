import { reduxForm } from 'redux-form';

import CommunitySATDateForm from 'sly/components/organisms/CommunitySATDateForm';
import { createValidator, required } from 'sly/services/validation';

const validate = createValidator({
  scheduledDate: [required],
  scheduledTime: [required],
  medicaid: [required],
});

export default reduxForm({
  validate,
  form: 'SATWizardForm',
  destroyOnUnmount: false,
})(CommunitySATDateForm);

