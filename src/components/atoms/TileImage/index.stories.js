import React from 'react';
import { storiesOf } from '@storybook/react';

import TileImage from 'sly/components/atoms/TileImage';

storiesOf('Atoms|TileImage', module).add('default', () => (
  <TileImage src="//d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg" />
));
