import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import communityWithAgents from 'sly/../private/storybook/sample-data/admin-property-rhoda-goldman-plaza.json';
import DashboardCommunityReferralContactDetailsContainer from 'sly/containers/DashboardCommunityReferralContactDetailsContainer';

const hsAction = action('handleSubmit');

const wrap = (props = {}) => {
  return <DashboardCommunityReferralContactDetailsContainer {...props} />;
};

storiesOf('Organisms|DashboardCommunityReferralContactDetails', module)
  .add('default', () => wrap({ handleSubmit: hsAction, community: communityWithAgents }));
