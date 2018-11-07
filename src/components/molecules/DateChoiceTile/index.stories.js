import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DateChoiceTile from 'sly/components/molecules/DateChoiceTile';

storiesOf('Molecules|DateChoiceTile', module)
  .add('default', () => <DateChoiceTile onClick={action('clicked')} date="2018-1-30" />)
  .add('selected', () => <DateChoiceTile onClick={action('clicked')} date="2018-1-30" selected />);
