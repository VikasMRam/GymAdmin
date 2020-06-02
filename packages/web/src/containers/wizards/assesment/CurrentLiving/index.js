import React from 'react';
import { reduxForm } from 'redux-form';

import { CurrentLiving } from 'sly/web/components/wizards/assesment';
import { createValidator, required } from 'sly/web/services/validation';

const validate = createValidator({
  currentLiving: [required],
});

const ReduxForm = reduxForm({
  form: 'CurrentLivingForm',
  destroyOnUnmount: false,
  validate,
})(CurrentLiving);

const CurrentLivingFormContainer = props => <ReduxForm {...props} />;

export default CurrentLivingFormContainer;
