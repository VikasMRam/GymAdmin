import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import OwnerStory from '.';

const { propInfo } = RhodaGoldmanPlaza;
const { ownerExprience } = propInfo;

storiesOf('Organisms|OwnerStory', module)
  .add('default', () => <OwnerStory ownerExprience={ownerExprience} />)
  .add('no experience', () => <OwnerStory />);
