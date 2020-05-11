import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityAnswer from '.';

const answer = {
  creator: 'The Seniorly Team',
  type: 'Question',
  createdAt: '2016-11-30 20:23:35',
  contentData: 'Yes pricing does include both cable and wifi.',
};

storiesOf('Molecules|CommunityAnswer', module)
  .add('default', () => (
    <CommunityAnswer answer={answer} />
  ));
