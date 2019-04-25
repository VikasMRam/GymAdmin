import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PutFamilyOnPause from 'sly/components/molecules/PutFamilyOnPause';

storiesOf('Molecules|PutFamilyOnPause', module)
  .add('default', () => (
    <PutFamilyOnPause onTogglePause={action('onTogglePause')} />
  ))
  .add('with isPaused', () => (
    <PutFamilyOnPause isPaused onTogglePause={action('onTogglePause')} />
  ));
