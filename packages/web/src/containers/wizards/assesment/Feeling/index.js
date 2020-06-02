import React from 'react';
import { reduxForm } from 'redux-form';

import { Feeling } from 'sly/web/components/wizards/assesment';
import { createValidator, required } from 'sly/web/services/validation';

const validate = createValidator({
  feeling: [required],
});

const ReduxForm = reduxForm({
  form: 'FeelingForm',
  destroyOnUnmount: false,
  validate,
})(Feeling);

const FeelingFormContainer = props => <ReduxForm {...props} />;

export default FeelingFormContainer;
