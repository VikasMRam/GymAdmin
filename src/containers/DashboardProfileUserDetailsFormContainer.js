import { reduxForm } from 'redux-form';

import DashboardProfileUserDetailsForm from 'sly/components/organisms/DashboardProfileUserDetailsForm';
import { createValidator, required, email, usPhone } from 'sly/services/validation/index';

const warn = createValidator({
  email: [required('Enter your email so your agent can help you by answering your questions and sending recommended communities.')],
});

const validate = createValidator({
  email: [email],
  phone: [required, usPhone],
});

const CommunityAskQuestionFormContainer = reduxForm({
  form: 'DashboardProfileUserDetailsForm',
  destroyOnUnmount: false,
  initialValues: {
    question: '',
  },
  warn,
  validate,
})(DashboardProfileUserDetailsForm);

export default CommunityAskQuestionFormContainer;
