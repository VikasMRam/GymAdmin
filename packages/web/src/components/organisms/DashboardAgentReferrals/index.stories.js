import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import agent from 'sly/../private/storybook/sample-data/agent-linda-iwamota';
import DashboardAgentReferrals from 'sly/components/organisms/DashboardAgentReferrals/index';

const hsAction = action('handleSubmit');

const wrap = (props = {}) => {
  return <DashboardAgentReferrals {...props} />;
};
storiesOf('Organisms|DashboardAgentReferrals', module)
  .add('emptyResults', () => wrap({ handleSubmit: hsAction, agents: [] }))
  .add('default', () => wrap({ handleSubmit: hsAction, agents: [agent] }));
