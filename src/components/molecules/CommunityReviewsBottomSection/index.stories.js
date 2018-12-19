import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityReviewsBottomSection from 'sly/components/molecules/CommunityReviewsBottomSection';

const communityName = 'Rhoda Goldman Plaza';

storiesOf('Molecules|CommunityReviewsBottomSection', module)
  .add('default', () => <CommunityReviewsBottomSection communityName={communityName} />);
