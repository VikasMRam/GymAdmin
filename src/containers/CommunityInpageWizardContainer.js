import { reduxForm } from 'redux-form';

import CommunityInpageWizardForm from 'sly/components/organisms/CommunityInpageWizardForm';

export default reduxForm({
  form: 'PWizardForm',
  destroyOnUnmount: false,
})(CommunityInpageWizardForm);

