import React from 'react';
import { Field } from 'redux-form';

import ReduxField from 'sly/web/components/organisms/ReduxField';
import FormSection from 'sly/web/components/molecules/FormSection';

const DashboardChangePasswordForm = ({ ...props }) => (
  <FormSection heading="Change Password" buttonText="Update Password" {...props}>
    <Field
      name="oldPassword"
      label="Old Password"
      type="password"
      placeholder=""
      component={ReduxField}
      wideWidth
    />
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

export default DashboardChangePasswordForm;
