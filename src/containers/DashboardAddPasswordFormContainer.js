import { reduxForm } from 'redux-form';

import DashboardAddPasswordForm from 'sly/components/organisms/DashboardAddPasswordForm';
import { createValidator, required, minLength, match } from 'sly/services/validation/index';

const passwordWarningMessage = 'Create a password so you can discover and keep track of your favorite communities.';

const messageObj = {
  newPassword: {
    required: passwordWarningMessage,
  },
  confirmPassword: {
    required: ' ',
  },
};

const warn = createValidator({
  newPassword: [required],
  confirmPassword: [required],
}, messageObj);

const validate = createValidator({
  newPassword: [minLength(8)],
  confirmPassword: [minLength(8), match('newPassword')],
});

const CommunityAskQuestionFormContainer = reduxForm({
  form: 'DashboardAddPasswordForm',
  destroyOnUnmount: false,
  validate,
  warn,
})(DashboardAddPasswordForm);

export default CommunityAskQuestionFormContainer;
