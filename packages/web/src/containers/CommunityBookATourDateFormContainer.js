import { reduxForm } from 'redux-form';

import CommunityBookATourDateForm from 'sly/components/organisms/CommunityBookATourDateForm';
import { createValidator, required } from 'sly/services/validation';

const validate = createValidator({
  scheduledDate: [required],
  scheduledTime: [required],
  medicaidCoverage: [required],
});

export default reduxForm({
  validate,
  form: 'BookATourWizardForm',
  destroyOnUnmount: false,
})(CommunityBookATourDateForm);

