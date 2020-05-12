import { reduxForm } from 'redux-form';

import DashboardAgentReferralContactDetails from 'sly/web/components/organisms/DashboardAgentReferralContactDetails';
import { createValidator, required, email } from 'sly/web/services/validation';

const validate = createValidator({
  name: [required],
  email: [required, email],
  slyMessage: [required],
});

const ReduxForm = reduxForm({
  form: 'DashboardAgentReferralContactDetails',
  validate,
  destroyOnUnmount: true,
})(DashboardAgentReferralContactDetails);

export default ReduxForm;
