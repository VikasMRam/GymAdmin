import React from 'react';
import { Field } from 'redux-form';

import ReduxField from 'sly/common/components/organisms/ReduxField';
import SectionForm from 'sly/web/components/molecules/SectionForm';

const DashboardChangePasswordForm = ({ ...props }) => (
  <SectionForm heading="Change Password" buttonText="Update Password" {...props}>
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
  </SectionForm>
);

export default DashboardChangePasswordForm;
