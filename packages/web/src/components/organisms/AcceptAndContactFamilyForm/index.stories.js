import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import AcceptAndContactFamilyForm from 'sly/web/components/organisms/AcceptAndContactFamilyForm';
import { withPreventDefault } from 'sly/web/services/helpers/forms';

const AcceptAndContactFamilyFormContainer = reduxForm({
  form: 'AcceptAndContactFamilyForm',
})(AcceptAndContactFamilyForm);

storiesOf('Organisms|AcceptAndContactFamilyForm', module)
  .add('default', () => <AcceptAndContactFamilyFormContainer contactTypes={['email', 'phone']} handleSubmit={withPreventDefault(action('submit'))} onCancelClick={action('onCancelClick')} />)
  .add('with no contact button click handlers', () => <AcceptAndContactFamilyFormContainer onCancelClick={action('onCancelClick')} />);

