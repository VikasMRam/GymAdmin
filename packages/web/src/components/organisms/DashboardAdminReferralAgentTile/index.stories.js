import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AgentLinda from 'sly/../private/storybook/sample-data/agent-linda-iwamota.json';
import DashboardAdminReferralAgentTile from 'sly/components/organisms/DashboardAdminReferralAgentTile';

const bottomActionOnClick = action('bottomActionOnClick');

const wrap = (props = {}) => <DashboardAdminReferralAgentTile agent={AgentLinda} {...props} />;

storiesOf('Organisms|DashboardAdminReferralAgentTile', module)
  .add('default', () => wrap())
  .add('recommended', () => wrap({ isRecommended: true }))
  .add('with bottom action', () => wrap({ isRecommended: true, bottomActionText: 'Change Agent', bottomActionOnClick }))
  .add('with stage', () => wrap({ isRecommended: true, stage: 'New' }))
  .add('with referralSentAt', () => wrap({ isRecommended: true, referralSentAt: '2019-09-24T12:15:20Z' }));
