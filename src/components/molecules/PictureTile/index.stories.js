import React from 'react';
import { storiesOf } from '@storybook/react';

import PictureTile from 'sly/components/molecules/PictureTile';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { gallery } = RhodaGoldmanPlaza;
const { images } = gallery;
const image = images[0];

storiesOf('Molecules|PictureTile', module).add('default', () => (
  <PictureTile src={image.hd} />
));
