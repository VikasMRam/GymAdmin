import { reduxForm } from 'redux-form';

import DashboardProfileUserDetailsForm from 'sly/components/organisms/DashboardProfileUserDetailsForm';
import { createValidator, required, email, usPhone } from 'sly/services/validation/index';

const emailWarning = 'Enter your email so your agent can help you by answering your questions and sending recommended communities.';
const messageObj = {
  email: {
    required: emailWarning,
  },
};

const warn = createValidator({
  email: [required],
}, messageObj);

const validate = createValidator({
  name: [required],
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
