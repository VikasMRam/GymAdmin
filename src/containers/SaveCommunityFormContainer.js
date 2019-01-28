import React from 'react';
import { reduxForm } from 'redux-form';

import SaveCommunityForm from 'sly/components/organisms/SaveCommunityForm';

const ReduxForm = reduxForm({
  form: 'SaveCommunityForm',
  // required to refresh when initialValues change. Ref: https://redux-form.com/6.7.0/examples/initializefromstate/
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
})(SaveCommunityForm);

const SaveCommunityFormContainer = props => <ReduxForm {...props} />;

export default SaveCommunityFormContainer;
