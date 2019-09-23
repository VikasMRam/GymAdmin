import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DashboardAdminReferralAgentTile from 'sly/components/organisms/DashboardAdminReferralAgentTile';

const notifyError = action('notifyError');
const notifyInfo = action('notifyInfo');
const bottomActionOnClick = action('bottomActionOnClick');

const agent = {
  name: 'Sarah Ordover',
  slyScore: 95,
  businessName: 'Assisted Living Locators Los Angeles, CA',
  workPhone: '310-853-8282',
  cellPhone: '323-513-2261',
  leadCount: 4,
};

const wrap = (props = {}) => <DashboardAdminReferralAgentTile {...agent} notifyInfo={notifyInfo} notifyError={notifyError} {...props} />;

storiesOf('Organisms|DashboardAdminReferralAgentTile', module)
  .add('default', () => wrap())
  .add('recommended', () => wrap({ isRecommended: true }))
  .add('with bottom action', () => wrap({ isRecommended: true, bottomActionText: 'Change Agent', bottomActionOnClick }))
  .add('with stage', () => wrap({ isRecommended: true, stage: 'New' }));

