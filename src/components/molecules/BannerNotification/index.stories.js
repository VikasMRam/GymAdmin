import React from 'react';
import { storiesOf } from '@storybook/react';

import BannerNotification from 'sly/components/molecules/BannerNotification';

storiesOf('Molecules|BannerNotification', module)
  .add('default', () => <BannerNotification>Hello world</BannerNotification>)
  .add('with palette', () => <BannerNotification palette="slate">Hello world</BannerNotification>);
