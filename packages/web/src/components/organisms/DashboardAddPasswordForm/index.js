import React from 'react';
import { func, string, bool, object } from 'prop-types';
import { Field } from 'redux-form';

import ReduxField from 'sly/common/components/organisms/ReduxField';
import SectionForm from 'sly/web/components/molecules/SectionForm';

const noPasswordWarning = 'Create a password so you can discover and keep track of your favorite communities.';

const DashboardAddPasswordForm = ({ pristine, ...props }) => {
  return (
    <SectionForm heading="Add Your Password" buttonText="Create Password" {...props}>
      <Field
        name="newPassword"
        label="New Password"
        type="password"
        placeholder=""
        component={ReduxField}
        wideWidth
        warning={pristine}
        message={noPasswordWarning}
      />
      <Field
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder=""
        component={ReduxField}
        wideWidth
        warning={pristine}
      />
    </SectionForm>
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
