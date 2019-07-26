import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions/src/index';
import communityWithAgents from 'sly/../private/storybook/sample-data/admin-property-rhoda-goldman-plaza';
import DashboardAdminSearchCommunityAgents from 'sly/components/organisms/DasboardAdminSearchCommunityAgents/index';

const hsAction = action('handleSubmit');

const wrap = (props = {}) => {
  return <DashboardAdminSearchCommunityAgents {...props} />;
};
storiesOf('Organisms|DashboardAdminSearchCommunityAgents', module)
  .add('emptyResults', () => wrap({ handleSubmit: hsAction, communities: [] }))
  .add('default', () => wrap({ handleSubmit: hsAction, communities: [communityWithAgents] }));
