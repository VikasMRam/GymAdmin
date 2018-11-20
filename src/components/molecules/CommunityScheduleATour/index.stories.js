import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityScheduleATour from 'sly/components/molecules/CommunityScheduleATour';

const onSATClick = () => alert('onSATClick');

storiesOf('Molecules|CommunityScheduleATour', module)
  .add('default', () => (
    <CommunityScheduleATour onSATClick={onSATClick} />
  ));
