import React from 'react';
import { storiesOf } from '@storybook/react';

import Thumbnail from '.';

const src = '//d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg';

storiesOf('Atoms|Thumbnail', module)
  .add('default', () => (
    <Thumbnail src={src} />
  ))
  .add('selected', () => (
    <Thumbnail src={src} selected />
  ))
  .add('with palette', () => (
    <Thumbnail src={src} selected palette="secondary" />
  ));
