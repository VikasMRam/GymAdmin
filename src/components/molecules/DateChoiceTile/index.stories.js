import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DateChoiceTile from 'sly/components/molecules/DateChoiceTile';

storiesOf('Molecules|DateChoiceTile', module)
  .add('default', () => <DateChoiceTile onClick={action('clicked')} date="1-30-2018" />)
  .add('selected', () => <DateChoiceTile onClick={action('clicked')} date="1-30-2018" selected />);
