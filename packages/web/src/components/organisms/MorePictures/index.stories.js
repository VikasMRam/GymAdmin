import React from 'react';
import { storiesOf } from '@storybook/react';

import MorePictures from 'sly/web/components/organisms/MorePictures';
import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { name, gallery } = RhodaGoldmanPlaza;

storiesOf('Organisms|MorePictures', module).add('default', () => (
  <MorePictures gallery={gallery} communityName={name} />
));
