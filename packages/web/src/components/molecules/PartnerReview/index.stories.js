import React from 'react';
import { storiesOf } from '@storybook/react';

import PartnerReview from 'sly/components/molecules/PartnerReview';

storiesOf('Molecules|PartnerReview', module)
  .add('default', () => (
    <PartnerReview name="Steve Villa" location="San Francisco, California" image="https://avatars.githubusercontent.com/u/113003" review="Steve was very professional, was very knowledgeable, extremely resourceful and most accommodating. It's been a pleasure to work with him. Thank you!" />
  ));
