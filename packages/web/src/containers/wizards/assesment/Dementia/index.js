import React from 'react';
import { reduxForm } from 'redux-form';

import { Dementia } from 'sly/web/components/wizards/assesment';
import { createValidator, required } from 'sly/web/services/validation';

const validate = createValidator({
  forgetful: [required],
});

const ReduxForm = reduxForm({
  form: 'DementiaForm',
  destroyOnUnmount: false,
  validate,
})(Dementia);

const DementiaFormContainer = props => <ReduxForm {...props} />;

export default DementiaFormContainer;
