import { reduxForm } from 'redux-form';

import DashboardCommunityReferralContactDetails from 'sly/components/organisms/DashboardCommunityReferralContactDetails';

const ReduxForm = reduxForm({
  form: 'DashboardCommunityReferralContactDetails',
  destroyOnUnmount: false,
})(DashboardCommunityReferralContactDetails);

export default ReduxForm;
