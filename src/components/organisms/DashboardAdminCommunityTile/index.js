import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { bool, func } from 'prop-types';
import { parseDate, durationInS } from 'sly/services/helpers/date';
import { phoneFormatter } from 'sly/services/helpers/phone';
import { size, palette, columnWidth } from 'sly/components/themes';
import { adminCommunityPropType } from 'sly/propTypes/community';
import { Heading, Badge, Link, Block, Icon, Box } from 'sly/components/atoms';

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
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: flex;
    flex-wrap: wrap;
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

const communityPropsMap = {
  typeCare: 'menu',
  communityPhone: 'phone',
  size: 'phone',
};

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

export default class DashboardAdminCommunityTile extends Component {
  static propTypes = {
    community: adminCommunityPropType.isRequired,
  };

  static defaultProps = {
    isRecommended: false,
  };


  render() {
    const { community } = this.props;
    const { adminInfo } = community;
    const { hasContract, lastViewedAt } = adminInfo;

    const lastViewedSecondsAgo = getLastViewedSAgo(lastViewedAt);

    return (
      <Fragment>
        <Header>
          <Heading level="subtitle"> { community.name } </Heading>
          {hasContract && <StyledBadge textPalette="green"><Icon icon="note" size="small" />Has Contract</StyledBadge> }
          {lastViewedSecondsAgo > -1 && <StyledBadge textPalette="grey" ><Icon icon="note" size="small" /> Last Viewed: {lastViewedSecondsAgo} s ago</StyledBadge> }
        </Header>
        <CommunityInfoWrapper>
          {Object.entries(communityPropsMap)
            .map(([key, icon]) => (
              <IconItem key={key}>
                <StyledIcon icon={icon} size="small" />
                <StyledBlock>{adminInfo[key]}</StyledBlock>
              </IconItem>
            ))
          }
          <IconItem>
            <StyledIcon icon="phone" size="small" />
            <StyledBlock>{phoneFormatter(adminInfo.communityPhone)}</StyledBlock>
          </IconItem>
          <IconItem>
            <StyledIcon icon="medical" size="small" />
            <StyledBlock>{adminInfo.typeCare.join(', ')}</StyledBlock>
          </IconItem>
          {['slyUrl', 'externalUrl'].map(key => (
            <IconItem key={key}>
              <StyledIcon icon="link" size="small" />
              <StyledLink href={adminInfo[key]}>{adminInfo[key]}</StyledLink>
            </IconItem>
            ))
          }
          <IconItem>
            <StyledIcon icon="medical" size="small" />
            <StyledBlock>{adminInfo.pricingString}</StyledBlock>
          </IconItem>
        </CommunityInfoWrapper>
        <IconItem>
          <StyledIcon icon="note" size="small" />
          <StyledBlock>{adminInfo.adminNote}</StyledBlock>
        </IconItem>
      </Fragment>
    );
  }
}
