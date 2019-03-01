import React, { Fragment, Component } from 'react';
import { bool } from 'prop-types';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

import { size } from 'sly/components/themes';
import { formatRating } from 'sly/services/helpers/rating';
import { community as communityPropType } from 'sly/propTypes/community';
import { Block, Icon, ClampedText } from 'sly/components/atoms';
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
`;

const RatingWrapper = styled(Block)`
  display: flex;
  margin-right: ${size('spacing.regular')};
`;

const TopWrapper = styled(Block)`
  display: flex;
  align-items: center;
  margin-bottom: ${size('spacing.regular')};
`;

const RatingValue = styled.div`
  margin-right: ${size('spacing.regular')};
`;

const Name = styled(ClampedText)`
  margin-bottom: ${size('spacing.small')};
`;

export default class CommunityInfo extends Component {
  static propTypes = {
    community: communityPropType,
    inverted: bool,
  };

  renderEstimatedRate = startingRate => startingRate ? (
    <Rate palette={this.props.inverted ? 'white' : 'primary'} weight="medium">
      Estimated <NumberFormat value={startingRate} displayType="text" thousandSeparator prefix="$" /> per month
    </Rate>
  ) : null;

  renderProviderRate = startingRate => startingRate ? (
    <Rate palette={this.props.inverted ? 'white' : 'primary'} weight="medium">
      <NumberFormat value={startingRate} displayType="text" thousandSeparator prefix="$" /> per month
    </Rate>
  ) : null;

  renderRate = ({ estimated, startingRate }) => estimated ? (
    this.renderEstimatedRate(startingRate)
  ) : (
    this.renderProviderRate(startingRate)
  );

  renderReviews = reviewsValue => (
    <RatingWrapper size="caption" palette={this.props.inverted ? 'white' : 'slate'}>
      <RatingValue>
        {reviewsValue > 0 ? formatRating(reviewsValue) : 'Not Yet Rated'}
      </RatingValue>
      {reviewsValue > 0 && <Rating value={reviewsValue} palette="warning" size="small" />}
    </RatingWrapper>
  );

  render() {
    const { community, inverted, ...props } = this.props;
    const {
      name, webViewInfo, floorPlanString, propInfo, propRatings,
      address,
    } = community;
    const { numReviews } = propRatings;
    const {
      line1, line2, city, state, zip,
    } = address;
    let { reviewsValue } = community;
    const { typeCare } = propInfo;
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
    if (propRatings) {
      ({ reviewsValue } = propRatings);
    }
    const formattedAddress = `${line1}, ${line2}, ${city},
      ${state}
      ${zip}`
      .replace(/\s/g, ' ')
      .replace(/, ,/g, ', ');

    if (floorPlan) {
      const roomTypes = floorPlan.split(',');
      floorPlanComponent = (
        <IconTextWrapper>
          <StyledIcon icon="bed" palette={inverted ? 'white' : 'grey'} size="small" />
          <ClampedText title={roomTypes.join(',')} palette={inverted ? 'white' : 'grey'} size="caption">
            {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
            {roomTypes.map((roomType, i) =>
              <Fragment key={roomType}>{!!i && <Fragment>, </Fragment>}{roomType}</Fragment>)}
          </ClampedText>
        </IconTextWrapper>
      );
    }
    if (livingTypes) {
      livingTypeComponent = (
        <IconTextWrapper>
          <StyledIcon icon="hospital" palette={inverted ? 'white' : 'grey'} size="small" />
          <ClampedText title={livingTypes.join(',')} palette={inverted ? 'white' : 'grey'} size="caption">
            {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
            {livingTypes.map((livingType, i) =>
              <Fragment key={livingType}>{!!i && <Fragment>{i === livingTypes.length - 1 ? ' & ' : ', '}</Fragment>}{livingType}</Fragment>)}
          </ClampedText>
        </IconTextWrapper>
      );
    }
    const addressComponent = (
      <IconTextWrapper>
        <StyledIcon icon="location" palette={inverted ? 'white' : 'grey'} size="small" />
        <ClampedText title={livingTypes.join(',')} palette={inverted ? 'white' : 'grey'} size="caption">
          {formattedAddress}
        </ClampedText>
      </IconTextWrapper>
    );

    return (
      <Wrapper {...props}>
        <Name size="subtitle" weight="medium" title={name} palette={inverted ? 'white' : 'slate'}>{name}</Name>
        <TopWrapper>
          {this.renderRate(community)}
          {this.renderReviews(reviewsValue)}
          <Block size="caption" palette={inverted ? 'white' : 'grey'}>
            {numReviews} reviews
          </Block>
        </TopWrapper>
        {addressComponent}
        {livingTypeComponent}
        {floorPlanComponent}
      </Wrapper>
    );
  }
}
