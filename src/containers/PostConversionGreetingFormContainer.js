import { reduxForm } from 'redux-form';

import PostConversionGreetingForm from 'sly/components/organisms/PostConversionGreetingForm';

export default reduxForm({
  form: 'PostConversionGreetingForm',
})(PostConversionGreetingForm);

