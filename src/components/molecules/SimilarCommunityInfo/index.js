import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Dotdotdot from 'react-dotdotdot';
import NumberFormat from 'react-number-format';

import { size, palette } from 'sly/components/themes';
import { Heading, Icon } from 'sly/components/atoms';
import Rating from 'sly/components/molecules/Rating';

const clamp = css`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const Wrapper = styled.div`
  color: ${palette('slate', 'base')};
  font-size: ${size('text.body')};
  box-sizing: border-box;
  min-width: 0;
  padding: ${size('spacing.regular')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: 0;
  }
`;

const StyledHeading = styled(Heading)`
  ${clamp};
  margin-bottom: 0;
`;

const RatingWrapper = styled.div`
  display: flex;
  margin-top:${size('spacing.small')};
  margin-bottom: ${size('spacing.small')};
  > * {
    ${clamp};
    width: unset;
  }
`;

const Rate = styled.span`
  margin-right: ${size('spacing.regular')};
  font-weight: bold;
`;

const StyledRating = styled(Rating)`
  display: inline-flex;
  vertical-align: top;
`;

const ClampedLine = styled.div`
  ${clamp};
  font-size: ${size('text.caption')};
`;

const Description = styled.div`
  color: ${palette('base')};
  font-size: ${size('text.caption')};
`;

const IconTextWrapper = styled.div`
  display: flex;
  color: ${palette('slate', 'filler')};
  margin-bottom: ${size('spacing.small')};
`;

const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.regular')};
`;

export default class SimilarCommunityInfo extends Component {
  static propTypes = {
    similarProperty: PropTypes.object.isRequired,
  };

  renderEstimatedRate = startingRate => startingRate ? (
    <Rate>
      Estimated <NumberFormat value={startingRate} displayType="text" thousandSeparator prefix="$" />/month
    </Rate>
  ) : null;

  renderProviderRate = startingRate => startingRate ? (
    <Rate>
      <NumberFormat value={startingRate} displayType="text" thousandSeparator prefix="$" />/month
    </Rate>
  ) : null;

  renderRate = ({ estimated, startingRate }) => estimated ? (
    this.renderEstimatedRate(startingRate)
  ) : (
    this.renderProviderRate(startingRate)
  )

  renderReviews = ({ numReviews, reviewsValue }) => {
    if (numReviews > 0) {
      return (
        <span>
          <StyledRating value={reviewsValue || 0} size="regular" />
          {' '}{numReviews }
        </span>
      );
    }

    return (
      <span>
        {' Not Yet Rated'}
      </span>
    );
  }

  render() {
    const { similarProperty: community, ...props } = this.props;

    const {
      name,
      addressString,
      description,
      webViewInfo,
    } = community;

    const {
      firstLineValue,
      secondLineValue,
    } = webViewInfo;
    const roomTypes = secondLineValue.split(',');
    const livingTypes = firstLineValue.split(',');

    // TODO : Get the following values from API Response
    return (
      <Wrapper {...props}>
        <StyledHeading level="title" size="subtitle">{name}</StyledHeading>
        <RatingWrapper>
          {this.renderRate(community)}
          {this.renderReviews(community)}
        </RatingWrapper>
        <IconTextWrapper>
          <StyledIcon icon="place" fill="slate" />
          <ClampedLine>
            {addressString}
          </ClampedLine>
        </IconTextWrapper>
        <IconTextWrapper>
          <StyledIcon icon="room" fill="slate" />
          <ClampedLine title={roomTypes.join('.')}>
            {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
            {roomTypes.map((roomType, i) =>
              <Fragment key={roomType}>{!!i && <Fragment>&nbsp;&nbsp;&middot;&nbsp;</Fragment>}{roomType}</Fragment>)}
          </ClampedLine>
        </IconTextWrapper>
        <IconTextWrapper>
          <StyledIcon icon="hospital" fill="slate" />
          <ClampedLine title={livingTypes.join('.')}>
            {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
            {livingTypes.map((livingType, i) =>
              <Fragment key={livingType}>{!!i && <Fragment>&nbsp;&nbsp;&middot;&nbsp;</Fragment>}{livingType}</Fragment>)}
          </ClampedLine>
        </IconTextWrapper>

        <Description palette="slate">
          <Dotdotdot clamp={2}>
            {description}
          </Dotdotdot>
        </Description>
      </Wrapper>
    );
  }
}
