import { reduxForm } from 'redux-form';

import CommunityFloorPlanPopupForm from 'sly/components/molecules/CommunityFloorPlanPopupForm';

const CommunityFloorPlanPopupFormContainer = reduxForm({
  form: 'CommunityFloorPlanPopupForm',
  destroyOnUnmount: true,
})(CommunityFloorPlanPopupForm);

export default CommunityFloorPlanPopupFormContainer;
