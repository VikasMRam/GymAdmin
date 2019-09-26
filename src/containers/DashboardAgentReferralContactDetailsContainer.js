import { reduxForm } from 'redux-form';

import DashboardAgentReferralContactDetails from 'sly/components/organisms/DashboardAgentReferralContactDetails';

const ReduxForm = reduxForm({
  form: 'DashboardAgentReferralContactDetails',
  destroyOnUnmount: false,
})(DashboardAgentReferralContactDetails);

export default ReduxForm;
