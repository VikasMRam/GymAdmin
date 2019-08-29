import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';
import dayjs from 'dayjs';

import { size, palette } from 'sly/components/themes';
import { adminCommunityPropType } from 'sly/propTypes/community';
import { Heading, Badge, Block, Icon, Hr } from 'sly/components/atoms';
import Stage from 'sly/components/molecules/Stage/index';

const Wrapper = styled.div`
  border: ${size('border.regular')} solid ${palette('grey', 'stroke')};
  border-radius: ${size('border.xLarge')};
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  align-items: flex-start;
  margin-bottom: ${size('spacing.small')};
`;

const CommunityName = styled(Heading)`
  margin-right: ${size('spacing.regular')};
`;

const CommunityAddressBlock = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
`;

const ReferralSentTime = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
`;

const TopSection = styled.div`
  padding: ${size('spacing.large')};
  padding-bottom: 0;
`;

const BottomSection = styled.div`
  padding: ${size('spacing.large')};
  padding-top: 0;
`;

const badgeColor = ({ textPalette }) => palette(textPalette, 'base');
const StyledBadge = styled(Badge)`
  background-color: ${badgeColor};
  color: ${palette('white', 'base')};
  text-transform: uppercase;
`;

const buildAddressDisplay = (community) => {
  const { address } = community;
  return `${address.line1}, ${address.city}, ${address.zip}, ${address.state}`;
};

const getReferralSentTimeText = (date) => {
  date = dayjs(date).utc();
  return date.format('M/D/YY, h:mmA');
};

const DashboardAdminReferralCommunityTile = ({ community, referralSentAt }) => {
  const { propInfo } = community;
  const { hasContract } = propInfo;

  return (
    <Wrapper>
      <TopSection>
        <HeaderSection>
          <CommunityName size="body">{community.name}</CommunityName>
          {hasContract && <StyledBadge textPalette="green"><Icon icon="circle-tick" palette="white" />Has Contract</StyledBadge> }
        </HeaderSection>
        <CommunityAddressBlock palette="grey" variation="dark" size="caption">{buildAddressDisplay(community)}</CommunityAddressBlock>
        {referralSentAt && <ReferralSentTime palette="grey" variation="dark" size="tiny">Sent on {getReferralSentTimeText(referralSentAt)}</ReferralSentTime>}
      </TopSection>
      <Hr palette="grey" size="large" />
      <BottomSection>
        <Stage stage="New" />
      </BottomSection>
    </Wrapper>
  );
};

DashboardAdminReferralCommunityTile.propTypes = {
  community: adminCommunityPropType.isRequired,
  referralSentAt: string,
};

export default DashboardAdminReferralCommunityTile;
