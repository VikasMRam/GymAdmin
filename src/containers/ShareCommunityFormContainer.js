import React from 'react';
import { func } from 'prop-types';
import { reduxForm } from 'redux-form';

import ShareCommunityForm from 'sly/components/organisms/ShareCommunityForm';

const ReduxForm = reduxForm({
  form: 'ShareCommunityForm',
  destroyOnUnmount: true,
  // required to refresh when initialValues change. Ref: https://redux-form.com/6.7.0/examples/initializefromstate/
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
})(ShareCommunityForm);

const ShareCommunityFormContainer = ({ submitForm, ...props }) => (
  <ReduxForm
    onSubmit={submitForm}
    {...props}
  />
);

ShareCommunityFormContainer.propTypes = {
  submitForm: func.isRequired,
};

export default ShareCommunityFormContainer;
