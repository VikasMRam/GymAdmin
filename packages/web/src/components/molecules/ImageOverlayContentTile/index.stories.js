import React from 'react';
import { storiesOf } from '@storybook/react';

import { Heading } from 'sly/web/components/atoms';
import ImageOverlayContentTile from 'sly/web/components/molecules/ImageOverlayContentTile';

storiesOf('Molecules|ImageOverlayContentTile', module)
  .add('default', () => (
    <ImageOverlayContentTile
      image="https://d1qiigpe5txw4q.cloudfront.net/uploads/3a2008ef77a20485e5924b0fcc34c123/Buena_Vista_logo-11_sd.jpg"
    >
      <Heading palette="white">Assisted Living</Heading>
    </ImageOverlayContentTile>
  ));
