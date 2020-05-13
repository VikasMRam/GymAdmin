import { reduxForm } from 'redux-form';

import CommunityBookATourDateForm from 'sly/web/components/organisms/CommunityBookATourDateForm';
import { createValidator, required } from 'sly/web/services/validation';

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

