import React, { Component } from 'react';
import styled from 'styled-components';
import { prop, ifProp } from 'styled-tools';

import { parseDate, durationInS } from 'sly/services/helpers/date';
import { phoneFormatter } from 'sly/services/helpers/phone';
import { buildPriceList } from 'sly/services/helpers/pricing';
import { size, palette, columnWidth } from 'sly/components/themes';
import { adminCommunityPropType } from 'sly/propTypes/community';
import { Heading, Badge, Link, Block, Icon, Span } from 'sly/components/atoms';
import { getHasContract, getIsCCRC, getIsSNF } from 'sly/services/helpers/community';
import  IconBadge from 'sly/components/molecules/IconBadge';

const Header = styled.div`
  display: flex;
  align-items: center;
  > * {
    margin-right: ${size('spacing.regular')};
  }
`;
const badgeColor = ({ textPalette }) => palette(textPalette, 'base');
const StyledBadge = styled(Badge)`
  background-color: ${badgeColor};
  color: ${palette('white', 'base')};
  text-transform: uppercase;
`;

const CommunityInfoWrapper = styled.div`
  padding: ${size('spacing.regular')};
  padding-bottom: 0;
  display: grid;
  grid-template-columns: max-content auto;
  grid-column-gap: ${size('spacing.large')};
  grid-row-gap: ${size('spacing.regular')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-left: auto;
    padding: ${size('spacing.regular')};
  }
`;


const StyledIconBadge = styled(IconBadge)`
  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    order: 2;
  }
`;


const getLastViewedSAgo = (lastViewedAt) => {
  try {
    const now = new Date();
    const lastViewedDate = parseDate(lastViewedAt);
    return durationInS(lastViewedDate, parseDate(now.toISOString()));
  } catch (e) {
    console.log(e);
  }
  return -1;
};

const buildPriceDisplay = (community) => {
  buildPriceList(community).map(e => `${e.label}-${e.value}`).join('\n');
};

const buildAddressDisplay = (community) => {
  const { address } = community;
  return `${address.line1}, ${address.city}, ${address.zip}, ${address.state}`;
};

export default class DashboardAdminCommunityTile extends Component {
  static propTypes = {
    community: adminCommunityPropType.isRequired,
  };

  static defaultProps = {
    isRecommended: false,
  };

  render() {
    const { community } = this.props;
    const hasContract = getHasContract(community);
    const hasCCRC = getIsCCRC(community);
    const hasSNF = getIsSNF(community);
    const { url: communityUrl, propInfo } = community;
    const { communityPhone, lastViewedAt } = propInfo;

    const lastViewedSecondsAgo = getLastViewedSAgo(lastViewedAt);

    return (
      <>
        <Header>
          <Heading level="subtitle"> { community.name } </Heading>
          {hasContract && <StyledIconBadge badgePalette="green" palette="white" icon="checkmark-circle" text="HAS CONTRACT" /> }
          {!hasContract && <StyledIconBadge badgePalette="danger" palette="white" icon="checkmark-circle" text="NO CONTRACT" /> }
          {hasCCRC && <StyledIconBadge badgePalette="warning" palette="white" icon="checkmark-circle" text="CCRC" />}
          {hasSNF && <StyledIconBadge badgePalette="warning" palette="white" icon="checkmark-circle" text="SNF" />}
          {lastViewedSecondsAgo > -1 && <StyledBadge textPalette="grey" ><Icon icon="note" size="small" /> Last Viewed: {lastViewedSecondsAgo} s ago</StyledBadge> }
        </Header>
        <CommunityInfoWrapper>
          <>
            <Span size="caption" palette="grey" variation="dark">Address</Span>
            <Span size="caption">{buildAddressDisplay(community)}</Span>
          </>
          <>
            <Span size="caption" palette="grey" variation="dark">Phone</Span>
            <Span size="caption">{phoneFormatter(communityPhone)}</Span>
          </>
          <>
            <Span size="caption" palette="grey" variation="dark">Care Types</Span>
            <Span size="caption">{propInfo.typeCare.join(', ')}</Span>
          </>
          <>
            <Span size="caption" palette="grey" variation="dark">Community Size</Span>
            <Span size="caption">{propInfo.communitySize}</Span>
          </>
          <>
            <Span size="caption" palette="grey" variation="dark">Profile URL</Span>
            <Span size="caption"><Link to={communityUrl} target="_blank">Click</Link></Span>
          </>
          <>
            <Span size="caption" palette="grey" variation="dark">Price</Span>
            <Span size="caption">{buildPriceDisplay(community)}</Span>
          </>
          <>
            <Span size="caption" palette="grey" variation="dark">Admin Notes</Span>
            <Span size="caption">{propInfo.adminNotes}</Span>
          </>
        </CommunityInfoWrapper>

      </>
    );
  }
}
