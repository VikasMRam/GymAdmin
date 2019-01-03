import React from 'react';
import { storiesOf } from '@storybook/react';

import TextBottomSection from 'sly/components/molecules/TextBottomSection';

const communityName = 'Rhoda Goldman Plaza';

storiesOf('Molecules|TextBottomSection', module)
  .add('default', () => (
    <TextBottomSection
      heading={`Have experience with ${communityName}?`}
      subHeading="Your review can help other families with their senior living search."
      buttonText="Write a review"
    />));
