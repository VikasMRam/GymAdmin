import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunitySATWidget from 'sly/components/organisms/CommunitySATWidget';

const onSATClick = () => alert('onSATClick');

storiesOf('Molecules|CommunitySATWidget', module)
  .add('default', () => (
    <CommunitySATWidget price={4300} rating={3.6} onSATClick={onSATClick} />
  ));
