import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import VideoThumbnail from 'sly/components/molecules/VideoThumbnail';

storiesOf('Molecules|VideoThumbnail', module)
  .add('default', () => (
    <VideoThumbnail onClick={action('clicked')} src="//d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg" />
  ));
