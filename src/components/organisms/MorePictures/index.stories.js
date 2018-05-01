import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';
import MorePictures from '.';

const { gallery } = RhodaGoldmanPlaza;

storiesOf('Organisms|MorePictures', module).add('default', () => (
  <MorePictures gallery={gallery} />
));
