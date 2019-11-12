import React, { Fragment, Component } from 'react';
import { bool } from 'prop-types';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

import { palette as palettePropType } from 'sly/propTypes/palette';
import { size } from 'sly/components/themes';
import { formatRating } from 'sly/services/helpers/rating';
import { community as communityPropType } from 'sly/propTypes/community';
import { Link, Block, Icon, Heading, ClampedText, Span } from 'sly/components/atoms';
import Rating from 'sly/components/molecules/Rating';

const Wrapper = styled.div`
  overflow: hidden;
`;

const IconTextWrapper = styled.div`
  display: flex;
  margin-bottom: ${size('spacing.small')};
  align-items: center;
`;

const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.regular')};
`;

const Rate = styled(Block)`
  margin-right: ${size('spacing.large')};
  margin-bottom: 0;
  line-height: ${size('lineHeight.minimal')};
`;

const TopWrapper = styled(Block)`
  display: flex;
  align-items: center;
  margin-bottom: ${size('spacing.regular')};
`;

const StyledRating = styled(Rating)`
  margin-right: ${size('spacing.regular')};
`;

const SpanWithRightMargin = styled(Span)`
  margin-right: ${size('spacing.regular')};
`;

const CommunityHeading = styled(Heading)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Info = styled(ClampedText)`
  line-height: ${size('text.subtitle')};
`;

const getAddress = ({ address, addressString }) => {
  if(address) {
    const { line1, line2, city, state, zip, } = address;
    return `${line1}, ${line2}, ${city},
        ${state}
        ${zip}`
      .replace(/\s/g, ' ')
      .replace(/, ,/g, ', ')
  }

  return addressString;
};

export default class CommunityInfo extends Component {
  static propTypes = {
    community: communityPropType,
    inverted: bool,
    showFloorPlan: bool,
    showDescription: bool,
    palette: palettePropType,
  };

  static defaultProps = {
    showFloorPlan: true,
  };

  render() {
    const { community, inverted, showFloorPlan, showDescription, palette, className } = this.props;
    const { webViewInfo, floorPlanString, propInfo = {}, propRatings, mainService } = community;

    const address = getAddress(community);
    const { reviewsValue, numReviews } = propRatings ? propRatings : community;
    const typeCare = propInfo.typeCare || community.typeCare;

    let floorPlanComponent = null;
    let livingTypeComponent = null;
    let floorPlan = floorPlanString;
    let livingTypes = typeCare;
    if (webViewInfo) {
      ({
        secondLineValue: floorPlan,
      } = webViewInfo);
      const { firstLineValue } = webViewInfo;
      livingTypes = firstLineValue.split(',');
    }
    if (mainService) {
      livingTypes = mainService.split(',');
    }

    if (floorPlan && showFloorPlan) {
      const roomTypes = floorPlan.split(',');
      floorPlanComponent = (
        <IconTextWrapper>
          <StyledIcon icon="bed" palette={inverted ? 'white' : 'grey'} size="small" />
          <Info title={roomTypes.join(',')} palette={inverted ? 'white' : 'grey'} size="caption">
            {roomTypes.map((roomType, i) =>
              <Fragment key={roomType}>{!!i && <>, </>}{roomType}</Fragment>)}
          </Info>
        </IconTextWrapper>
      );
    }
    if (livingTypes && livingTypes.length) {
      livingTypeComponent = (
        <IconTextWrapper>
          <StyledIcon icon="hospital" palette={inverted ? 'white' : 'grey'} size="small" />
          <Info title={livingTypes.join(',')} palette={inverted ? 'white' : 'grey'} size="caption">
            {livingTypes.map((livingType, i) =>
              <Fragment key={livingType}>{!!i && <>{i === livingTypes.length - 1 ? ' & ' : ', '}</>}{livingType}</Fragment>)}
          </Info>
        </IconTextWrapper>
      );
    }

    return (
      <Wrapper className={className}>
        <Link href={community.url}>
          <CommunityHeading level="subtitle" size="subtitle" title={community.name} palette={inverted ? 'white' : 'slate'}>
            {community.name}
          </CommunityHeading>
        </Link>
        <TopWrapper>
          {community.startingRate ? (
            <Rate palette={palette || (inverted ? 'white' : 'primary')} weight="medium">
              <NumberFormat
                value={community.startingRate}
                displayType="text"
                prefix="$"
                thousandSeparator
                renderText={(number) => `${community.estimated ? 'Estimated ' : ''}${number}/month`}
              />
            </Rate>
          ) : null }
          <SpanWithRightMargin palette={inverted ? 'white' : 'slate'} size={reviewsValue > 0 ? 'caption' : 'tiny'}>
            {reviewsValue > 0 ? formatRating(reviewsValue) : 'Not Yet Rated'}
          </SpanWithRightMargin>
          {reviewsValue > 0 && <StyledRating value={reviewsValue} palette="warning" size="small" />}
          <Span size="caption" palette={inverted ? 'white' : 'grey'}>
            ({numReviews})
          </Span>
        </TopWrapper>
        {address && (
          <IconTextWrapper>
            <StyledIcon icon="location" palette={inverted ? 'white' : 'grey'} size="small" />
            <Info title={livingTypes.join(',')} palette={inverted ? 'white' : 'grey'} size="caption">
              {address}
            </Info>
          </IconTextWrapper>
        )}
        {livingTypeComponent}
        {floorPlanComponent}
        {showDescription &&
          <Block palette={inverted ? 'white' : 'grey'} size="caption">
            {community.description || propInfo.communityDescription}
          </Block>
        }
      </Wrapper>
    );
  }
}
