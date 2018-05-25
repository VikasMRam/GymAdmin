import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { palette } from 'styled-theme';
import Dotdotdot from 'react-dotdotdot';

import { size } from 'sly/components/themes';
import { Heading, Block } from 'sly/components/atoms';
import Rating from 'sly/components/molecules/Rating';

const clamp = css`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const Wrapper = styled.div`
  color: ${palette('slate', 0)};
  font-size: ${size('text.body')};
  box-sizing: border-box;
  min-width: 0;
  padding: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: 0;
    padding-top: ${size('spacing.regular')};
  }
`;

const StyledHeading = styled(Heading)`
  ${clamp};
`;

const RatingWrapper = styled.div`
  display: flex;
  margin-bottom: ${size('spacing.regular')};
  > * {
    ${clamp};
    width: unset;
  }
`;

const Rate = styled.span`
  margin-right: ${size('spacing.regular')};
`;

const StyledRating = styled(Rating)`
  display: inline-flex;
  vertical-align: top;
`;

const ClampedLine = styled.div`
  ${clamp};
`;

const ClampedBlock = styled.div`
  color: ${palette(0)}; 
  font-size: ${size('text.caption')};
  margin-top: ${size('spacing.regular')};
`;

export default class SimilarCommunityInfo extends Component {
  static propTypes = {
    similarProperty: PropTypes.object.isRequired,
  };

  renderRate({ startingRate }){
    if (!startingRate) return null;
    return (
      <Rate>
        ${startingRate} per month
      </Rate>
    );
  }

  renderReviews({ numReviews, reviewsValue }) {
    return (
      <span>
        <StyledRating value={reviewsValue || 0} size="regular" />
        {' '}{numReviews || '(No ratings)'}
      </span>
    ); 
  }

  render() {
    const { similarProperty: community, ...props } = this.props;

    const {
      name,
      startingRate,
      reviewsValue,
      numReviews,
      description,
      webViewInfo,
    } = community;

    const {
      firstLineValue,
      secondLineValue,
    } = webViewInfo;

    // TODO : Get the following values from API Response
    return (
      <Wrapper {...props}>
        <StyledHeading level='subtitle'>{name}</StyledHeading>
        <RatingWrapper>
          {this.renderRate(community)}
          {this.renderReviews(community)}
        </RatingWrapper>

        <ClampedLine>{firstLineValue}</ClampedLine>

        <ClampedLine>Floor Plans: {secondLineValue}</ClampedLine>

        <ClampedBlock palette="grayscale">
          <Dotdotdot clamp={2}>
            {description}
          </Dotdotdot>
        </ClampedBlock>
      </Wrapper>
    );
  }
}
