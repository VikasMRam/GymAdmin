import React, { Component } from 'react';
import styled from 'styled-components';
import { prop } from 'styled-tools';

import { parseDate, durationInS } from 'sly/services/helpers/date';
import { phoneFormatter } from 'sly/services/helpers/phone';
import { buildPriceList } from 'sly/services/helpers/pricing';
import { size, palette, columnWidth } from 'sly/components/themes';
import { adminCommunityPropType } from 'sly/propTypes/community';
import { Heading, Badge, Link, Block, Icon } from 'sly/components/atoms';

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
const lineHeight = p => size('lineHeight', p.size);
const textSize = p => size('text', p.size);

const CommunityInfoWrapper = styled.div`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: flex;
    flex-flow: column wrap;
    height: calc(${textSize} * ${lineHeight} * ${prop('rows')});
    margin-right: -${size('spacing.xLarge')};
    > * {
      width: ${columnWidth(2, size('spacing.xLarge'))};
      margin-right: ${size('spacing.xLarge')};
    }
   }
`;

const IconItem = styled.div`
  display: flex;
`;

const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.regular')};
`;

const StyledLink = styled(Link)`
  margin-right: ${size('spacing.regular')};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  
`;

const StyledBlock = styled(Block)`
  font-size:${size('text.caption')};
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
    const { propInfo } = community;
    const { hasContract, lastViewedAt } = propInfo;

    const lastViewedSecondsAgo = getLastViewedSAgo(lastViewedAt);

    return (
      <>
        <Header>
          <Heading level="subtitle"> { community.name } </Heading>
          {hasContract && <StyledBadge textPalette="green"><Icon icon="note" size="small" />Has Contract</StyledBadge> }
          {lastViewedSecondsAgo > -1 && <StyledBadge textPalette="grey" ><Icon icon="note" size="small" /> Last Viewed: {lastViewedSecondsAgo} s ago</StyledBadge> }
        </Header>
        <CommunityInfoWrapper>
          <IconItem>
            <StyledIcon icon="link" size="small" />
            <StyledBlock>{buildAddressDisplay(community)}</StyledBlock>
          </IconItem>
          <IconItem>
            <StyledIcon icon="phone" size="small" />
            <StyledBlock>{phoneFormatter(propInfo.communityPhone)}</StyledBlock>
          </IconItem>
          <IconItem>
            <StyledIcon icon="hospital" size="small" />
            <StyledBlock>{propInfo.typeCare.join(', ')}</StyledBlock>
          </IconItem>
          <IconItem>
            <StyledIcon icon="house" size="small" />
            <StyledBlock>{propInfo.communitySize}</StyledBlock>
          </IconItem>
          <IconItem>
            <StyledIcon icon="link" size="small" />
            <StyledLink href={community.url}>{community.url}</StyledLink>
          </IconItem>
          <IconItem>
            <StyledIcon icon="link" size="small" />
            <StyledLink href={propInfo.websiteUrl}>{propInfo.websiteUrl}</StyledLink>
          </IconItem>
          <IconItem>
            <StyledIcon icon="dollar" size="small" />
            <StyledBlock>{buildPriceDisplay(community)}</StyledBlock>
          </IconItem>
        </CommunityInfoWrapper>
        <IconItem>
          <StyledIcon icon="note" size="small" />
          <StyledBlock>{propInfo.adminNote}</StyledBlock>
        </IconItem>
      </>
    );
  }
}
