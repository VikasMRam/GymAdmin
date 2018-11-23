import React from 'react';
import { storiesOf } from '@storybook/react';

import ThumbnailScroller from 'sly/components/molecules/ThumbnailScroller';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { name, gallery } = RhodaGoldmanPlaza;
const { images } = gallery;
const thumbnails = images.map((img, i) => {
  const newImg = img;
  newImg.src = img.thumb;
  newImg.alt = `${name} ${i + 1} thumbmnail`;
  return newImg;
});


storiesOf('Molecules|ThumbnailScroller', module)
  .add('default', () => <ThumbnailScroller thumbnails={thumbnails} />)
  .add('with selected', () => <ThumbnailScroller thumbnails={thumbnails} selected={10} />)
  .add('with selected and palette', () => <ThumbnailScroller thumbnails={thumbnails} selected={10} palette="primary" />);
