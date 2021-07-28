import React from 'react';
import styled from 'styled-components';
import { string, func, bool } from 'prop-types';
import { ifProp, ifNotProp } from 'styled-tools';

import { PLATFORM_ADMIN_ROLE } from 'sly/common/constants/roles';
import { size, palette } from 'sly/common/components/themes';
import { adminCommunityPropType } from 'sly/common/propTypes/community';
import { getHasContract, getIsCCRC, getIsSNF } from 'sly/web/services/helpers/community';
import { buildAddressDisplay, getReferralSentTimeText } from 'sly/web/services/helpers/communityReferral';
import { Heading, Block, Button, Link } from 'sly/common/components/atoms';
import { Span } from 'sly/web/components/atoms';
import Role from 'sly/web/components/common/Role';
import Stage from 'sly/web/components/molecules/Stage';
// import cursor from 'sly/web/components/helpers/cursor';
import IconBadge from 'sly/web/components/molecules/IconBadge';

const getTitlePalette = variant => p => palette(p.titlePalette, variant);

const Wrapper = styled.div`
  border: ${size('border.regular')} solid ${palette('grey', 'stroke')};
  border-radius: ${size('spacing.small')};
`;

const SectionsWrapper = styled.div`
  background-color: ${ifProp('disabled', palette('grey', 'background'))};
  background-color: ${ifProp('title', getTitlePalette('stroke'))};
  border-bottom-left-radius: ${ifNotProp('isBottomSectionPresent', size('border.xxLarge'))};
  border-bottom-right-radius: ${ifNotProp('isBottomSectionPresent', size('border.xxLarge'))};
  border-bottom: 1px ${ifProp('isBottomSectionPresent', 'solid', 'none')} ${palette('slate', 'stroke')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: flex;
  }
`;

const TitleSection = styled.div`
  padding: calc(${size('spacing.small')} + ${size('spacing.tiny')}) ${size('spacing.regular')};
  background-color: ${getTitlePalette('base')};
  border-top-left-radius: ${size('border.xxLarge')};
  border-top-right-radius: ${size('border.xxLarge')};
`;

const HeaderSection = styled.div`
  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    display: flex;
    align-items: center;
    align-items: flex-start;
    margin-bottom: ${size('spacing.small')};
  }
`;

const CommunityName = styled(Heading)`
  margin-right: ${size('spacing.regular')};
  margin-bottom: ${size('spacing.small')};
  white-space: nowrap;

  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    order: 1;
  }
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

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: ${size('spacing.xLarge')};
    padding-bottom: 0;
  }
`;
const DetailsTable = styled.div`
  padding: ${size('spacing.large')};
  padding-bottom: ${ifProp('isFloatingSectionPresent', 0)};
  display: grid;
  grid-template-columns: max-content auto;
  grid-column-gap: ${size('spacing.large')};
  grid-row-gap: ${size('spacing.regular')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-left: auto;
    padding: ${size('spacing.xLarge')};
  }
`;

const FloatingSection = styled.div`
  padding: ${size('spacing.large')};
  padding-top: 0;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-left: auto;
    padding: ${size('spacing.xLarge')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    padding-top: ${size('spacing.large')};
  }
`;

const BottomSection = styled.div`
  background-color: ${ifProp('disabled', palette('grey', 'background'))};
  background-color: ${ifProp('title', getTitlePalette('stroke'))};
  padding: calc(${size('spacing', 'regular')} + ${size('spacing', 'small')}) ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: calc(${size('spacing', 'regular')} + ${size('spacing', 'small')}) ${size('spacing.xLarge')};
  }
`;

// const ActionSection = cursor(styled.div`
//   text-align: center;
// `);

const StyledIconBadge = styled(IconBadge)`
  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    order: 2;
  }
`;

const DashboardAdminReferralCommunityTile = ({
  className, title, titlePalette, community, isAdminUser, childFamilyPath, referralSentAt, stage, disabled, onClick, actionText, actionClick,
}) => {
  const isBottomSectionPresent = !!stage;
  const isFloatingSectionPresent = !!(referralSentAt || (actionText && actionClick));
  const { hasContract = false, isPending = false } = getHasContract(community);
  const hasCCRC = getIsCCRC(community);
  const hasSNF = getIsSNF(community);
  const { url: communityUrl, propInfo = {} } = community;
  const { communityPhone } = propInfo;
  const shouldShowHasContract = hasContract && !isPending && isAdminUser;
  const shouldShowPendingContract = hasContract && isPending && isAdminUser;
  const shouldShowNoContract = !hasContract && isAdminUser;
  return (
    <Wrapper className={className} onClick={onClick}>
      {title && <TitleSection titlePalette={titlePalette}><Span weight="bold" size="micro" palette="white">{title}</Span></TitleSection>}
      <SectionsWrapper title={title} titlePalette={titlePalette} disabled={disabled} isBottomSectionPresent={isBottomSectionPresent}>
        <TopSection isFloatingSectionPresent={isFloatingSectionPresent}>
          <HeaderSection>
            {shouldShowHasContract && <StyledIconBadge badgePalette="green" palette="white" icon="checkmark-circle" text="HAS CONTRACT" />}
            {shouldShowPendingContract && <StyledIconBadge badgePalette="yellow" palette="white" icon="hourglass" text="CONTRACT PENDING" />}
            {shouldShowNoContract && <StyledIconBadge badgePalette="danger" palette="white" icon="checkmark-circle" text="NO CONTRACT" />}
            {hasCCRC && <StyledIconBadge badgePalette="warning" palette="white" icon="checkmark-circle" text="CCRC" />}
            {hasSNF && <StyledIconBadge badgePalette="warning" palette="white" icon="checkmark-circle" text="SNF" />}
            <CommunityName size="body" palette="primary">{community.name}</CommunityName>
          </HeaderSection>
          <CommunityAddressBlock palette="grey" variation="dark" size="caption">{buildAddressDisplay(community)}</CommunityAddressBlock>

        </TopSection>
        {actionText && actionClick && (
          <FloatingSection>
            <Button palette="primary" size="caption" ghost onClick={actionClick}>{actionText}</Button>
          </FloatingSection>
        )}
        {referralSentAt && (
          <FloatingSection>
            <ReferralSentTime palette="grey" variation="dark" size="tiny">Sent on {getReferralSentTimeText(referralSentAt)}</ReferralSentTime>
          </FloatingSection>
        )}
      </SectionsWrapper>
      <DetailsTable isFloatingSectionPresent={isFloatingSectionPresent}>
        { communityPhone && (
          <>
            <Span size="caption" palette="grey" variation="dark">Community Phone:</Span>
            <Span size="caption">{communityPhone}</Span>
          </>
        )}
        { communityUrl && (
          <>
            <Span size="caption" palette="grey" variation="dark">Community URL:</Span>
            <Span size="caption"><Link to={communityUrl} target="_blank">Link to Profile</Link></Span>
          </>
        )}
        { referralSentAt && (
          <>
            <Span size="caption" palette="grey" variation="dark">Sent At:</Span>
            <Span size="caption">{getReferralSentTimeText(referralSentAt)}</Span>
          </>
        )

        }
        { childFamilyPath && (
          <>
            <Role is={PLATFORM_ADMIN_ROLE}>
              <Span size="caption" palette="grey" variation="dark">Referral Link:</Span>
              <Span size="caption"><Link to={childFamilyPath} target="_blank">Referral</Link></Span>
            </Role>
          </>
        )}
      </DetailsTable>
      {stage && (
        <>
          <Role is={PLATFORM_ADMIN_ROLE}>
            <BottomSection title={title} titlePalette={titlePalette} disabled={disabled} >
              <Stage stage={stage} />
            </BottomSection>
          </Role>
        </>
      )}
    </Wrapper>
  );
};

DashboardAdminReferralCommunityTile.propTypes = {
  className: string,
  title: string,
  titlePalette: string,
  community: adminCommunityPropType.isRequired,
  childFamilyPath: string,
  referralSentAt: string,
  stage: string,
  disabled: bool,
  onClick: func,
  actionText: string,
  actionClick: func,
  isAdminUser: bool,
};

DashboardAdminReferralCommunityTile.defaultProps = {
  titlePalette: 'warning',
};

export default DashboardAdminReferralCommunityTile;
