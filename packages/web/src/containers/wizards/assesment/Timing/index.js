import React from 'react';
import { reduxForm } from 'redux-form';

import { Timing } from 'sly/web/components/wizards/assesment';
import { createValidator, required } from 'sly/web/services/validation';

const validate = createValidator({
  timing: [required],
});

const ReduxForm = reduxForm({
  form: 'TimingForm',
  destroyOnUnmount: false,
  validate,
})(Timing);

const TimingFormContainer = props => <ReduxForm {...props} />;

export default TimingFormContainer;
