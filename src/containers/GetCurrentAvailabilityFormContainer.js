import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { object, func } from 'prop-types';

import { getDetail } from 'sly/store/selectors';
import { resourceCreateRequest } from 'sly/store/resource/actions';
import { createValidator, required, email } from 'sly/services/validation';

import GetCurrentAvailabilityForm from 'sly/components/molecules/GetCurrentAvailabilityForm';

const validate = createValidator({
  email: [required, email],
});

const ReduxForm = reduxForm({
  form: 'GetCurrentAvailabilityForm',
  destroyOnUnmount: false,
  validate,
})(GetCurrentAvailabilityForm);

const GetCurrentAvailabilityFormContainer = ({
  userDetails, submitConversion, community,
}) => {
  const { email } = userDetails;
  const initialValues = { email };

  return (
    <ReduxForm
      initialValues={initialValues}
      onSubmit={submitConversion}
      community={community}
    />
  );
};

GetCurrentAvailabilityFormContainer.propTypes = {
  community: object.isRequired,
  submitConversion: func.isRequired,
  userDetails: object,
};

const mapStateToProps = state => ({
  userDetails: (getDetail(state, 'userAction') || {}).userDetails || {},
});

export default connect(mapStateToProps)(GetCurrentAvailabilityFormContainer);

