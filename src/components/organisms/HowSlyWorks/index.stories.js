import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import HowSlyWorks from '.';

const {
  name, propInfo,
} = RhodaGoldmanPlaza;
const {
  communityDescription, staffDescription, residentDescription,
} = propInfo;

storiesOf('Organisms|HowSlyWorks', module)
  .add('onlyReason1', () => (
    <HowSlyWorks
      reason1="This is a great reason"
    />
  ))
  .add('2reasons', () => (
    <HowSlyWorks
      reason1="This is a great reason"
      reason2="This is a second great reason"
    />
  ))
  .add('3reasons', () => (
    <HowSlyWorks
      reason1="This is a great reason"
      reason2="This is a second great reason"
      reason3="This is a thirdgreat reason"
    />
  ))
