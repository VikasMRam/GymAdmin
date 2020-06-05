import React from 'react';
import { reduxForm } from 'redux-form';

import { End } from 'sly/web/components/wizards/assesment';

const ReduxForm = reduxForm({
  form: 'EndForm',
  destroyOnUnmount: false,
})(End);

const EndFormContainer = props => <ReduxForm {...props} />;

export default EndFormContainer;
