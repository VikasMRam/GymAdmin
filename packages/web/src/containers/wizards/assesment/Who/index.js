import React from 'react';
import { reduxForm } from 'redux-form';

import { Who } from 'sly/web/components/wizards/assesment';
import { createValidator, required } from 'sly/web/services/validation';

const validate = createValidator({
  lookingFor: [required],
});

const ReduxForm = reduxForm({
  form: 'WhoForm',
  destroyOnUnmount: false,
  validate,
})(Who);

const WhoFormContainer = props => <ReduxForm {...props} />;

export default WhoFormContainer;
