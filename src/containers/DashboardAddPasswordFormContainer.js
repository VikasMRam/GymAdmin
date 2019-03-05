import { reduxForm } from 'redux-form';

import DashboardAddPasswordForm from 'sly/components/organisms/DashboardAddPasswordForm';
import { createValidator, minLength, match } from 'sly/services/validation/index';

const validate = createValidator({
  newPassword: [minLength(8)],
  confirmPassword: [minLength(8), match('newPassword')],
});

const CommunityAskQuestionFormContainer = reduxForm({
  form: 'DashboardAddPasswordForm',
  destroyOnUnmount: false,
  validate,
})(DashboardAddPasswordForm);

export default CommunityAskQuestionFormContainer;
