import React from 'react';
import { func } from 'prop-types';
import { reduxForm } from 'redux-form';

import SaveCommunityForm from 'sly/components/organisms/SaveCommunityForm';

const ReduxForm = reduxForm({
  form: 'SaveCommunityForm',
  destroyOnUnmount: true,
  // required to refresh when initialValues change. Ref: https://redux-form.com/6.7.0/examples/initializefromstate/
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
})(SaveCommunityForm);

const SaveCommunityFormContainer = ({ submitForm, ...props }) => (
  <ReduxForm
    onSubmit={submitForm}
    {...props}
  />
);

SaveCommunityFormContainer.propTypes = {
  submitForm: func.isRequired,
};

export default SaveCommunityFormContainer;
