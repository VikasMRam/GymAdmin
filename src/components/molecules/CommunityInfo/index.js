import React, { Fragment, Component } from 'react';
import { bool } from 'prop-types';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

import { palette as palettePropType } from 'sly/propTypes/palette';
import { size } from 'sly/components/themes';
import { formatRating } from 'sly/services/helpers/rating';
import { community as communityPropType } from 'sly/propTypes/community';
import { Block, Icon, ClampedText, Span } from 'sly/components/atoms';
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
    showFloorPlan: bool,
    palette: palettePropType,
  };

  static defaultProps = {
    showFloorPlan: true,
  };

  renderEstimatedRate = (startingRate) => {
    const { inverted, palette } = this.props;
    const paletteProp = palette || (inverted ? 'white' : 'primary');

    return startingRate ? (
      <Rate palette={paletteProp} weight="medium">
        Estimated <NumberFormat value={startingRate} displayType="text" thousandSeparator prefix="$" />/month
      </Rate>
    ) : null;
  };

  renderProviderRate = (startingRate) => {
    const { inverted, palette } = this.props;
    const paletteProp = palette || (inverted ? 'white' : 'primary');

    return startingRate ? (
      <Rate palette={paletteProp} weight="medium">
        <NumberFormat value={startingRate} displayType="text" thousandSeparator prefix="$" />/month
      </Rate>
    ) : null;
  };

  renderRate = ({ estimated, startingRate }) => estimated ? (
    this.renderEstimatedRate(startingRate)
  ) : (
    this.renderProviderRate(startingRate)
  );

  renderReviews = reviewsValue => (
    <RatingWrapper size="caption" palette={this.props.inverted ? 'white' : 'slate'}>
      <RatingValue>
        {reviewsValue > 0 ? formatRating(reviewsValue) : <Span size="tiny">Not Yet Rated</Span>}
      </RatingValue>
      {reviewsValue > 0 && <Rating value={reviewsValue} palette="warning" size="small" />}
    </RatingWrapper>
  );

  render() {
    const {
      community, inverted, showFloorPlan, ...props
    } = this.props;
    const {
      name, webViewInfo, floorPlanString, propInfo, propRatings,
      address, addressString,
    } = community;
    let { numReviews, typeCare = [] } = community;
    let { reviewsValue } = community;
    if (propInfo) {
      ({ typeCare } = propInfo);
    }
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
    if (propRatings) {
      ({ numReviews } = propRatings);
    }
    let formattedAddress = addressString;
    if (address) {
      const {
        line1, line2, city, state, zip,
      } = address;
      formattedAddress = `${line1}, ${line2}, ${city},
        ${state}
        ${zip}`
        .replace(/\s/g, ' ')
        .replace(/, ,/g, ', ');
    }

    if (floorPlan && showFloorPlan) {
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
    if (livingTypes && livingTypes.length) {
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
            ({numReviews})
          </Block>
        </TopWrapper>
        {addressComponent}
        {livingTypeComponent}
        {floorPlanComponent}
      </Wrapper>
    );
  }
}
