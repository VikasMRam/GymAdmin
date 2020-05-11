import { reduxForm } from 'redux-form';

import ImportantCovid19UpdatesStep from 'sly/components/organisms/ImportantCovid19UpdatesStep';

export default reduxForm({
  form: 'ImportantCovid19UpdatesStep',
  destroyOnUnmount: false,
})(ImportantCovid19UpdatesStep);
