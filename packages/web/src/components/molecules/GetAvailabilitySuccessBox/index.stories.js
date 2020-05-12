import React from 'react';
import { storiesOf } from '@storybook/react';

import GetAvailabilitySuccessBox from 'sly/components/molecules/GetAvailabilitySuccessBox';

storiesOf('Molecules|GetAvailabilitySuccessBox', module)
  .add('default', () => (
    <GetAvailabilitySuccessBox />
  ))
  .add('with hasAllUserData', () => (
    <GetAvailabilitySuccessBox hasAllUserData />
  ));