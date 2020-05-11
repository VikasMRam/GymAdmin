import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import RatingInput from 'sly/components/molecules/RatingInput';

storiesOf('Molecules|RatingInput', module)
  .add('default', () => <RatingInput />)
  .add('disabled', () => (
    <RatingInput disabled value={3.5} />
  ))
  .add('events', () => (
    <RatingInput
      onChange={action('change')}
    />
  ));
