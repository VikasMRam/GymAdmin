import React from 'react';
import { func, string, bool, object } from 'prop-types';
import { Field } from 'redux-form';

import ReduxField from 'sly/components/organisms/ReduxField/index';
import FormSection from 'sly/components/molecules/FormSection/index';

const DashboardAddPasswordForm = ({
  handleSubmit, ...props
}) => {
  return (
    <FormSection heading="Create Password" buttonText="Create Password" onSubmit={handleSubmit} {...props}>
      <Field
        name="newPassword"
        label="New Password"
        type="password"
        placeholder=""
        component={ReduxField}
        wideWidth
      />
      <Field
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder=""
        component={ReduxField}
        wideWidth
      />
    </FormSection>
  );
};

DashboardAddPasswordForm.propTypes = {
  handleSubmit: func.isRequired,
  pristine: bool,
  submitting: bool,
  user: object,
  error: string,
};

export default DashboardAddPasswordForm;
