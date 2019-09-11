import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DashboardAdminReferralCommunityTile from 'sly/components/organisms/DashboardAdminReferralCommunityTile';
import community from 'sly/../private/storybook/sample-data/admin-property-rhoda-goldman-plaza.json';

const wrap = (props = {}) => <DashboardAdminReferralCommunityTile {...props} />;

storiesOf('Organisms|DashboardAdminReferralCommunityTile', module)
  .add('default', () => {
    community.propInfo.hasContract = false;
    community.propInfo.lastViewedAt = null;
    return wrap({ community });
  })
  .add('hasContract', () => {
    community.propInfo.hasContract = true;
    return wrap({ community });
  })
  .add('with referralSentAt', () => {
    community.propInfo.hasContract = true;
    const referralSentAt = (new Date()).toISOString();
    return wrap({ community, referralSentAt });
  })
  .add('with actionText and actionClick', () => {
    community.propInfo.hasContract = true;
    const actionText = 'Change Community';
    const actionClick = action(actionText);
    return wrap({ community, actionText, actionClick });
  })
  .add('with actionText and actionClick and title', () => {
    community.propInfo.hasContract = true;
    const actionText = 'Change Community';
    const actionClick = action(actionText);
    const title = 'FAMILY INTERESTED IN COMMUNITY';
    return wrap({
      community, actionText, actionClick, title,
    });
  });

