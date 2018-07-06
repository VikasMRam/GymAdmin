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
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate,
})(GetCurrentAvailabilityForm);

const GetCurrentAvailabilityFormContainer = ({
  userDetails, submitExpressConversion, community,
}) => {
  const { email } = userDetails;
  const initialValues = { email };

  return (
    <ReduxForm
      initialValues={initialValues}
      onSubmit={submitExpressConversion}
      community={community}
    />
  );
};

GetCurrentAvailabilityFormContainer.propTypes = {
  community: object.isRequired,
  submitExpressConversion: func.isRequired,
  userDetails: object,
};

const mapStateToProps = state => ({
  userDetails: (getDetail(state, 'userAction') || {}).userDetails || {},
});

export default connect(mapStateToProps)(GetCurrentAvailabilityFormContainer);

