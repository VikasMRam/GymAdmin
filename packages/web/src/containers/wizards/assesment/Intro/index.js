import React from 'react';
import { reduxForm } from 'redux-form';

import { Intro } from 'sly/web/components/wizards/assesment';
import { createValidator, required } from 'sly/web/services/validation';

const validate = createValidator({
  whatToDoNext: [required],
});

const ReduxForm = reduxForm({
  form: 'IntroForm',
  destroyOnUnmount: false,
  validate,
})(Intro);

const IntroFormContainer = props => <ReduxForm {...props} />;

export default IntroFormContainer;
