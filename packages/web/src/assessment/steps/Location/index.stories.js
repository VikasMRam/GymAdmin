import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import Location from '.';

import { withPreventDefault } from 'sly/common/services/helpers/forms';

const LocationContainer = reduxForm({
  form: 'Location',
})(Location);

storiesOf('Wizards|assessment/Steps/Location', module)
  .add('default', () => (
    <LocationContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
    />
  ));
