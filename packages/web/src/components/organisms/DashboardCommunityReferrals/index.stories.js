import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import communityWithAgents from 'sly/web/../private/storybook/sample-data/admin-property-rhoda-goldman-plaza.json';
import DashboardCommunityReferrals from 'sly/web/components/organisms/DashboardCommunityReferrals/index';

const hsAction = action('handleSubmit');

const wrap = (props = {}) => {
  return <DashboardCommunityReferrals {...props} />;
};
storiesOf('Organisms|DashboardCommunityReferrals', module)
  .add('emptyResults', () => wrap({ handleSubmit: hsAction, communities: [] }))
  .add('default', () => wrap({ handleSubmit: hsAction, communities: [communityWithAgents] }));
