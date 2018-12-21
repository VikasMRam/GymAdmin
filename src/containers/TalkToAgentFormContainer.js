import React from 'react';
import { func } from 'prop-types';
import { reduxForm } from 'redux-form';

import TalkToAgentForm from 'sly/components/organisms/TalkToAgentForm';

const ReduxForm = reduxForm({
  form: 'TalkToAgentFormContainer',
  destroyOnUnmount: true,
  // required to refresh when initialValues change. Ref: https://redux-form.com/6.7.0/examples/initializefromstate/
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
})(TalkToAgentForm);

const handleLocationChange = () => {

};

const TalkToAgentFormContainer = ({ submitForm, ...props }) => (
  <ReduxForm
    onSubmit={submitForm}
    onLocationChange={handleLocationChange}
    {...props}
  />
);

TalkToAgentFormContainer.propTypes = {
  submitForm: func.isRequired,
};

export default TalkToAgentFormContainer;
