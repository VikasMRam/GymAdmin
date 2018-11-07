import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityAgentCashback from 'sly/components/molecules/CommunityAgentCashback';

storiesOf('Molecules|CommunityAgentCashback', module)
  .add('default', () => (
    <CommunityAgentCashback />
  ));
