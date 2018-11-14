import React, { Fragment, Component } from 'react';
import { oneOf } from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import NumberFormat from 'react-number-format';

import { getKey, palette, size } from 'sly/components/themes';
import { community as communityPropType } from 'sly/propTypes/community';

import { Block, Icon, ClampedText } from 'sly/components/atoms';

const Wrapper = styled.div`
  width: 100%;
`;

const IconTextWrapper = styled.div`
  display: flex;
  color: ${palette(prop('palette'), 'base')};
  margin-bottom: ${size('spacing.small')};
  align-items: center;
`;
IconTextWrapper.displayName = 'IconTextWrapper';

const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.regular')};
`;

const StyledRatingIcon = styled(Icon)`
  margin-right: ${size('spacing.tiny')};
`;

const Rate = styled(Block)`
  margin-right: ${size('spacing.large')};
  font-weight: 500;
  margin-bottom: 0;
`;
Rate.displayName = 'Rate';

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${size('spacing.small')};
`;
RatingWrapper.displayName = 'RatingWrapper';

const Rating = styled(Block)`
  display: flex;
`;
Rating.displayName = 'Rating';

const Name = styled(Block)`
  margin-bottom: ${size('spacing.small')};
  font-weight: 500;
`;

const LastIconTextWrapper = IconTextWrapper.extend`
  margin-bottom: ${size('spacing.regular')};
`;
LastIconTextWrapper.displayName = 'LastIconTextWrapper';

export default class CommunityInfo extends Component {
  static propTypes = {
    community: communityPropType,
    palette: oneOf(Object.keys(getKey('palette'))),
  };

  static defaultProps = {
    palette: 'slate',
  };

  renderEstimatedRate = startingRate => startingRate ? (
    <Rate palette={this.props.palette}>
      Estimated <NumberFormat value={startingRate} displayType="text" thousandSeparator prefix="$" /> per month
    </Rate>
  ) : null;

  renderProviderRate = startingRate => startingRate ? (
    <Rate palette={this.props.palette}>
      <NumberFormat value={startingRate} displayType="text" thousandSeparator prefix="$" /> per month
    </Rate>
  ) : null;

  renderRate = ({ estimated, startingRate }) => estimated ? (
    this.renderEstimatedRate(startingRate)
  ) : (
    this.renderProviderRate(startingRate)
  );

  renderReviews = ({ reviewsValue }) => (
    <Rating size="caption" palette={this.props.palette}>
      <StyledRatingIcon icon="star" size="small" palette="primary" />
      {reviewsValue > 0 ? reviewsValue : 'Not Yet Rated'}
    </Rating>
  );

  render() {
    const { community, palette: paletteProp, ...props } = this.props;
    const { name, webViewInfo } = community;
    let floorPlanComponent = null;
    let livingTypeComponent = null;
    if (webViewInfo) {
      const {
        firstLineValue,
        secondLineValue,
      } = webViewInfo;
      const isFloorPlanPresent = !!secondLineValue;
      if (isFloorPlanPresent) {
        const roomTypes = secondLineValue.split(',');
        floorPlanComponent = (
          <IconTextWrapper palette={paletteProp}>
            <StyledIcon icon="room" palette={paletteProp} />
            <ClampedText title={roomTypes.join(',')} palette={paletteProp}>
              {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
              {roomTypes.map((roomType, i) =>
                <Fragment key={roomType}>{!!i && <Fragment>, </Fragment>}{roomType}</Fragment>)}
            </ClampedText>
          </IconTextWrapper>
        );
      }
      const isLivingTypesPresent = !!firstLineValue;
      if (isLivingTypesPresent) {
        const livingTypes = firstLineValue.split(',');
        livingTypeComponent = (
          <LastIconTextWrapper palette={paletteProp}>
            <StyledIcon icon="hospital" palette={paletteProp} />
            <ClampedText title={livingTypes.join(',')} palette={paletteProp}>
              {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
              {livingTypes.map((livingType, i) =>
                <Fragment key={livingType}>{!!i && <Fragment>{i === livingTypes.length - 1 ? ' & ' : ', '}</Fragment>}{livingType}</Fragment>)}
            </ClampedText>
          </LastIconTextWrapper>
        );
      }
    }
    return (
      <Wrapper {...props}>
        <Name size="subtitle" palette={paletteProp}>{name}</Name>
        {floorPlanComponent}
        {livingTypeComponent}
        <RatingWrapper>
          {this.renderRate(community)}
          {this.renderReviews(community)}
        </RatingWrapper>
      </Wrapper>
    );
  }
}
