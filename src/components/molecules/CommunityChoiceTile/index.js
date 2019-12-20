import React from 'react';
import styled, { css } from 'styled-components';
import { bool, func } from 'prop-types';

import { community as communityPropType } from 'sly/propTypes/community';
import { size, palette } from 'sly/components/themes';
import { Heading } from 'sly/components/atoms';
import Rating from 'sly/components/molecules/Rating';
import Checkbox from 'sly/components/molecules/Checkbox';

const defaultImage =
  'https://d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg';

export const Wrapper = styled.div`
  margin-bottom: ${p => p.borderless ? 0 : size('spacing.large')};

  position: relative;
  display: flex;
  border: ${p => p.borderless ? 0 : size('border.regular')} solid ${palette('secondary', 'dark35')};
  ${props =>
    props.selected &&
    css`
      background-color: ${palette('secondary', 'stroke')};
    `};

  input[type='checkbox'] {
    margin: 0px;
  }
  input[type='checkbox']:checked {
    background-color: ${palette('secondary', 'dark35')};
  }

  ${props =>
    props.selectable &&
    css`
      :hover {
        cursor: pointer;
      }
    `};

  // Disabling Text selection on the Tile
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Image = styled.img`
  width: ${size('tile', 'tiny', 'width')};
  height: ${size('tile', 'tiny', 'height')};
`;
const Info = styled.div`
  margin: ${size('spacing.large')};
`;

const StyledCheckbox = styled(Checkbox)`
  position: absolute;
  top: ${size('spacing.small')};
  right: ${size('spacing.small')};
`;

const StyledHeading = styled(Heading)`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Data = styled.div`
  display: flex;
  font-size: ${size('spacing.large')};
`;

const Mobrate = styled.span`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: none;
  }
`;

const Deskrate = styled.span`
  display: none;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: unset;
  }
`;

const ReviewsWrapper = styled.div`
  display: flex;
  margin-left: ${size('spacing.xLarge')};
`;

const NumberReviews = styled.div`
  margin-left: ${size('spacing.regular')};
`;

const CommunityChoiceTile = ({
  community,
  selected,
  selectable,
  borderless,
  onClick,
}) => {
  const {
    name, picture, startingRate, numReviews, reviewsValue,
  } = community;

  return (
    <Wrapper
      selected={selected && selectable}
      selectable={selectable}
      borderless={borderless}
      onClick={onClick}
    >
      <Image src={picture || defaultImage} />
      {selectable && <StyledCheckbox checked={selected && selectable} />}
      <Info>
        <StyledHeading level="subtitle" size="subtitle">{name}</StyledHeading>
        <Data>
          <div>
            ${startingRate}
            <Mobrate>/mo</Mobrate>
            <Deskrate> per month</Deskrate>
          </div>
          <ReviewsWrapper>
            <Rating value={reviewsValue} size="small" />
            <NumberReviews>{numReviews}</NumberReviews>
          </ReviewsWrapper>
        </Data>
      </Info>
    </Wrapper>
  );
};

CommunityChoiceTile.propTypes = {
  selected: bool.isRequired,
  selectable: bool,
  borderless: bool,
  onClick: func,
  community: communityPropType,
};

CommunityChoiceTile.defaultProps = {
  selected: false,
  selectable: false,
  borderless: false,
};

export default CommunityChoiceTile;
