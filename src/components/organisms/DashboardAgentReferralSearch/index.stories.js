import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DashboardAgentReferralSearch from 'sly/components/organisms/DashboardAgentReferralSearch/index';

const hsAction = action('handleSubmit');

const wrap = (props = {}) => {
  return <DashboardAgentReferralSearch {...props} />;
};
storiesOf('Organisms|DashboardAgentReferralSearch', module)
  .add('default', () => wrap({ handleSubmit: hsAction }));
