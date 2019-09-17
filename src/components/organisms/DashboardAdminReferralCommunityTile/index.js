import React, { Fragment } from 'react';
import styled from 'styled-components';
import { string, func } from 'prop-types';
import dayjs from 'dayjs';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import { adminCommunityPropType } from 'sly/propTypes/community';
import { Heading, Badge, Block, Icon, Hr, Span } from 'sly/components/atoms';
import Stage from 'sly/components/molecules/Stage';
// import cursor from 'sly/components/helpers/cursor';
import Button from 'sly/components/atoms/Button/index';

const getTitlePalette = variant => p => palette(p.titlePalette, variant);

const Wrapper = styled.div`
  border: ${size('border.regular')} solid ${palette('grey', 'stroke')};
  border-radius: ${size('border.xxLarge')};
`;

const SectionsWrapper = styled.div`
  background-color: ${ifProp('title', getTitlePalette('stroke'))};
  border-bottom-left-radius: ${size('border.xxLarge')};
  border-bottom-right-radius: ${size('border.xxLarge')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
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
  padding-bottom: ${ifProp('isBottomSectionPresent', 0)};
`;

const BottomSection = styled.div`
  padding: ${size('spacing.large')};
  padding-top: 0;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin-left: auto;
    padding-top: ${size('spacing.large')};
  }
`;

// const ActionSection = cursor(styled.div`
//   text-align: center;
// `);

const badgeColor = ({ textPalette }) => palette(textPalette, 'base');
const StyledBadge = styled(Badge)`
  background-color: ${badgeColor};
  border-radius: ${size('spacing.small')};
  margin-bottom: ${size('spacing.small')};
  padding-top: ${size('spacing.small')};

  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    order: 2;
  }
`;

const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.small')};
`;

const buildAddressDisplay = (community) => {
  const { address } = community;
  return `${address.line1}, ${address.city}, ${address.zip}, ${address.state}`;
};

const getReferralSentTimeText = (date) => {
  date = dayjs(date).utc();
  return date.format('M/D/YY, h:mmA');
};

// FIXME: Click works only after passing onClick as prop. Need to check why we need to pass onClick
const DashboardAdminReferralCommunityTile = ({
  className, title, titlePalette, community, referralSentAt, stage, onClick, actionText, actionClick,
}) => {
  const { propInfo } = community;
  const hasContract = propInfo ? propInfo.hasContract : false;
  const isBottomSectionPresent = !!(stage || referralSentAt || (actionText && actionClick));

  return (
    <Wrapper className={className} onClick={onClick}>
      {/* FIXME: Title should be of 10px according to the design */}
      {title && <TitleSection titlePalette={titlePalette}><Span weight="bold" size="tiny" palette="white">{title}</Span></TitleSection>}
      <SectionsWrapper title={title} titlePalette={titlePalette}>
        <TopSection isBottomSectionPresent={isBottomSectionPresent}>
          <HeaderSection>
            {hasContract && <StyledBadge textPalette="green"><StyledIcon icon="checkmark-circle" palette="white" size="small" /><Span palette="white" size="tiny">Has Contract</Span></StyledBadge> }
            <CommunityName size="body" palette="primary">{community.name}</CommunityName>
          </HeaderSection>
          <CommunityAddressBlock palette="grey" variation="dark" size="caption">{buildAddressDisplay(community)}</CommunityAddressBlock>
        </TopSection>
        {referralSentAt && (
          <BottomSection>
            <ReferralSentTime palette="grey" variation="dark" size="tiny">Sent on {getReferralSentTimeText(referralSentAt)}</ReferralSentTime>
          </BottomSection>
        )}
        {actionText && actionClick && (
          <BottomSection>
            <Button palette="primary" size="caption" ghost onClick={actionClick}>{actionText}</Button>
          </BottomSection>
        )}
        {stage && (
          <Fragment>
            <Hr palette="grey" size="large" />
            <BottomSection>
              <Stage stage={stage} />
            </BottomSection>
          </Fragment>
        )}
        {/* {actionText && actionClick && (
          <ActionSection onClick={actionClick}>
            <Hr palette="grey" size="large" />
            <BottomSection>
              <Block palette="primary" size="caption">{actionText}</Block>
            </BottomSection>
          </ActionSection>
        )} */}
      </SectionsWrapper>
    </Wrapper>
  );
};

DashboardAdminReferralCommunityTile.propTypes = {
  className: string,
  title: string,
  titlePalette: string,
  community: adminCommunityPropType.isRequired,
  referralSentAt: string,
  stage: string,
  onClick: func,
  actionText: string,
  actionClick: func,
};

DashboardAdminReferralCommunityTile.defaultProps = {
  titlePalette: 'warning',
};

export default DashboardAdminReferralCommunityTile;
