import { reduxForm } from 'redux-form';

import AskQuestionToAgentForm from 'sly/components/molecules/AskQuestionToAgentForm';
import { createValidator, required, usPhone, email } from 'sly/services/validation';

const validate = createValidator({
  name: [required],
  email: [required, email],
  phone: [required, usPhone],
  notes: [required],
});

export default reduxForm({
  validate,
  form: 'AskQuestionToAgentForm',
  destroyOnUnmount: false,
})(AskQuestionToAgentForm);
