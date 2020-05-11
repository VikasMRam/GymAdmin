import React from 'react';
import { storiesOf } from '@storybook/react';

import HowSlyWorksVideo from 'sly/components/organisms/HowSlyWorksVideo';

storiesOf('Organisms|HowSlyWorksVideo', module)
  .add('default', () => (
    <HowSlyWorksVideo />
  ))
  .add('with playing', () => (
    <HowSlyWorksVideo isPlaying />
  ));
