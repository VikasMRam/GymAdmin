import React from 'react';
import { reduxForm } from 'redux-form';

import { ADL } from 'sly/web/components/wizards/assesment';
import { createValidator, required } from 'sly/web/services/validation';

const validate = createValidator({
  adl: [required],
});

const ReduxForm = reduxForm({
  form: 'ADLForm',
  destroyOnUnmount: false,
  validate,
})(ADL);

const ADLFormContainer = props => <ReduxForm {...props} />;

export default ADLFormContainer;
