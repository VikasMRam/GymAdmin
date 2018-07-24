import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';

import BoxRadioButton from '.';

const form = props => <form><BoxRadioButton {...props} /></form>;
const BoxRadioButtonContainer = reduxForm({
  form: 'BoxRadioButton',
  destroyOnUnmount: false,
})(form);

storiesOf('Molecules|BoxRadioButton', module)
  .add('default', () => <BoxRadioButtonContainer name="test" label="test" />)
  .add('checked', () => <BoxRadioButtonContainer name="test" checked label="test" />)
  .add('with help text', () => <BoxRadioButtonContainer name="test" label="test" helpText="help text" />)
  .add('multiselect', () => <BoxRadioButtonContainer multiSelect name="test" label="test" />)
  .add('multiselect checked', () => <BoxRadioButtonContainer multiSelect checked name="test" label="test" />);
