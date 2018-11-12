import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CommunitySATWidget from 'sly/components/organisms/CommunitySATWidget';

storiesOf('Organisms|CommunitySATWidget', module)
  .add('default', () => (
    <CommunitySATWidget price={4300} rating={3.6} onSATClick={action('SAT clicked')} />
  ));
