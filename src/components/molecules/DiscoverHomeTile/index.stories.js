import React from 'react';
import { storiesOf } from '@storybook/react';

import DiscoverHomeTile from 'sly/components/molecules/DiscoverHomeTile';

storiesOf('Molecules|DiscoverHomeTile', module)
  .add('default', () => (
    <DiscoverHomeTile
      image="https://d1qiigpe5txw4q.cloudfront.net/uploads/3a2008ef77a20485e5924b0fcc34c123/Buena_Vista_logo-11_sd.jpg"
      title="Independent Living"
      description="200 properties starting from $4,000"
      buttonText="See More"
    />
  ))
  .add('xLarge size', () => (
    <DiscoverHomeTile
      size="xLarge"
      image="https://d1qiigpe5txw4q.cloudfront.net/uploads/3a2008ef77a20485e5924b0fcc34c123/Buena_Vista_logo-11_sd.jpg"
      title="Independent Living"
      description="200 properties starting from $4,000"
      buttonText="See More"
    />
  ));
