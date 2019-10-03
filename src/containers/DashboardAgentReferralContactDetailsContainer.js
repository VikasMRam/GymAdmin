import { reduxForm } from 'redux-form';

import DashboardAgentReferralContactDetails from 'sly/components/organisms/DashboardAgentReferralContactDetails';
import { createValidator, required, email } from 'sly/services/validation';

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
