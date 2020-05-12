import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DashboardAgentReferralContactDetailsContainer from 'sly/web/containers/DashboardAgentReferralContactDetailsContainer';

const onChangeAgent = action('Change Agent');
const handleSubmit = action('Submit');

const agent = {
  name: 'Sarah Ordover',
  slyScore: 95,
  businessName: 'Assisted Living Locators Los Angeles, CA',
  workPhone: '310-853-8282',
  cellPhone: '323-513-2261',
  leadCount: 4,
};

const wrap = (props = {}) => {
  return <DashboardAgentReferralContactDetailsContainer {...props} />;
};

storiesOf('Organisms|DashboardAgentReferralContactDetails', module)
  .add('default', () => wrap({ agent, onChangeAgent, handleSubmit }));
