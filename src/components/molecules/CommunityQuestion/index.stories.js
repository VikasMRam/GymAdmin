import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityQuestion from '.';

const question = {
  creator: 'Guest User',
  type: 'Question',
  createdAt: '2016-08-24 04:35:15',
  contentData: 'Do the apartments at AgeSong Hayes Valley Care have their own private bathrooms?',
};

storiesOf('Molecules|CommunityQuestion', module)
  .add('default', () => (
    <CommunityQuestion question={question} />
  ));
