import React from 'react';
import { storiesOf } from '@storybook/react';

import MeetOthersTile from '.';

storiesOf('Molecules|MeetOthersTile', module)
  .add('default', () => (
    <MeetOthersTile
      image="https://d1qiigpe5txw4q.cloudfront.net/uploads/3a2008ef77a20485e5924b0fcc34c123/Buena_Vista_logo-11_sd.jpg"
      title="Middle-aged adult female child #3"
      description={'"Family Caregiver Alliance provides “online educational materials in terms of fact sheets, videos, and online support groups" which are invaluable to family caregivers and their families.'}
    />
  ));
