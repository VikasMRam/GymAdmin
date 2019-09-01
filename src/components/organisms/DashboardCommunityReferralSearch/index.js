import React, { Fragment } from 'react';
import { func, arrayOf } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { Block, Hr } from 'sly/components/atoms';
import DashboardCommunityAgentSearchBox from 'sly/components/organisms/DashboardCommunityAgentSearchBox';
import DashboardAdminReferralCommunityTile from 'sly/components/organisms/DashboardAdminReferralCommunityTile';
import { adminCommunityPropType } from 'sly/propTypes/community';
import pad from 'sly/components/helpers/pad';
import cursor from 'sly/components/helpers/cursor';

const Wrapper = styled.div`
  padding: ${size('spacing.xLarge')} ${size('spacing.large')};
`;

const SendReferralTitleBlock = pad(Block);

const StyledDashboardAdminReferralCommunityTile = cursor(styled(DashboardAdminReferralCommunityTile)`
  margin-top: ${size('spacing.large')};

  &:hover {
    box-shadow: 0 ${size('spacing.tiny')} ${size('spacing.small')} ${palette('grey', 'stroke')};
  }
`);

const DashboardCommunityReferralSearch = ({ communities, handleCommunitySearch, nextStep }) => (
  <Wrapper>
    <SendReferralTitleBlock size="subtitle">Send referral to a community</SendReferralTitleBlock>
    <DashboardCommunityAgentSearchBox handleSubmit={handleCommunitySearch} />
    {communities && communities.length > 0 && (
      <Fragment>
        <Hr size="large" />
        <Block>Showing {communities.length}</Block>
        {communities.map(e => <StyledDashboardAdminReferralCommunityTile key={e.name} community={e} onClick={() => nextStep({ community: e })} />)}
      </Fragment>
    )}
  </Wrapper>
);

DashboardCommunityReferralSearch.propTypes = {
  handleCommunitySearch: func.isRequired,
  sendReferral: func.isRequired,
  handleSubmit: func,
  nextStep: func,
  communities: arrayOf(adminCommunityPropType),
};

export default DashboardCommunityReferralSearch;
