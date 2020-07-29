import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DashboardAdminReferralCommunityTile from 'sly/web/components/organisms/DashboardAdminReferralCommunityTile';
import community from 'sly/storybook/sample-data/admin-property-rhoda-goldman-plaza.json';

const wrap = (props = {}) => <DashboardAdminReferralCommunityTile {...props} />;

storiesOf('Organisms|DashboardAdminReferralCommunityTile', module)
  .add('default', () => {
    community.rgsAux.rgsInfo.contract_info.hasContract = false;
    community.propInfo.lastViewedAt = null;
    return wrap({ community });
  })
  .add('hasContract', () => {
    community.rgsAux.rgsInfo.contract_info.hasContract = true;
    return wrap({ community });
  })
  .add('hasContract and stage', () => {
    community.rgsAux.rgsInfo.contract_info.hasContract = true;
    const stage = 'New';
    return wrap({ community, stage });
  })
  .add('with referralSentAt', () => {
    community.rgsAux.rgsInfo.contract_info.hasContract = true;
    const referralSentAt = (new Date()).toISOString();
    return wrap({ community, referralSentAt });
  })
  .add('with referralSentAt and disabled', () => {
    community.rgsAux.rgsInfo.contract_info.hasContract = true;
    const referralSentAt = (new Date()).toISOString();
    const disabled = true;
    return wrap({ community, referralSentAt, disabled });
  })
  .add('with actionText and actionClick', () => {
    community.rgsAux.rgsInfo.contract_info.hasContract = true;
    const actionText = 'Change Community';
    const actionClick = action(actionText);
    return wrap({ community, actionText, actionClick });
  })
  .add('with actionText and actionClick and title', () => {
    community.rgsAux.rgsInfo.contract_info.hasContract = true;
    const actionText = 'Change Community';
    const actionClick = action(actionText);
    const title = 'FAMILY INTERESTED IN COMMUNITY';
    return wrap({
      community, actionText, actionClick, title,
    });
  })
  .add('with title and stage', () => {
    community.rgsAux.rgsInfo.contract_info.hasContract = true;
    const title = 'FAMILY INTERESTED IN COMMUNITY';
    const stage = 'New';
    return wrap({
      community, title, stage,
    });
  });

