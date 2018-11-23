import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CommunityScheduleATour from 'sly/components/molecules/CommunityScheduleATour';

const onSATClick = () => action('onSATClick');

storiesOf('Molecules|CommunityScheduleATour', module)
  .add('default', () => (
    <CommunityScheduleATour onSATClick={onSATClick} />
  ))
  .add('with isAlreadyTourScheduled', () => (
    <CommunityScheduleATour isAlreadyTourScheduled onSATClick={onSATClick} />
  ));
