import React from 'react';
import { storiesOf } from '@storybook/react';

import Image from '.';

const src = '//d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg';
const notExistngsrc = '//d1qiigpe5txw4q.cloudfront.net/uploads/9e98a8d1b8d59941d725a30737861441/front%20of%20RGP%20building-4_hd.jpg';

storiesOf('Atoms|Image', module)
  .add('default', () => <Image src={src} />)
  .add('with dimensions', () => <Image src={src} width={500} height={300} />)
  .add('failed to load image', () => <Image src={notExistngsrc} />);
