import React from 'react';
import styled, { css } from 'styled-components';
import { palette } from 'styled-theme';
import { bool, string, shape, number, func } from 'prop-types';

import { size } from 'sly/components/themes';
import { Heading } from 'sly/components/atoms';
import Rating from 'sly/components/molecules/Rating';
import Checkbox from 'sly/components/molecules/Checkbox';

const defaultImage =
  'https://d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg';

export const Wrapper = styled.div`
  margin-bottom: ${size('spacing.large')};

  position: relative;
  display: flex;
  border: ${size('border.regular')} solid ${palette('secondary', 0)};
  ${props =>
    props.selected &&
    css`
      background-color: ${palette('secondary', 3)};
    `};

  input[type='checkbox'] {
    margin: 0px;
  }
  input[type='checkbox']:checked {
    background-color: ${palette('secondary', 0)};
  }

  :hover {
    cursor: pointer;
  }

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

export const StyledCheckbox = styled(Checkbox)`
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

const CommunityTilePriceRatingDiv = styled.div`
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

const CommunityTileyRatingDiv = styled.div`
  display: flex;
  margin-left: ${size('spacing.xLarge')};
`;

const CommunityTileNumberReviewDiv = styled.div`
  margin-left: ${size('spacing.regular')};
`;

const CommunityTile = ({
  size,
  palette,
  community,
  selectable,
  selected,
  onClick,
  ...props
}) => {
  const {
    name, uri, picture, rating, startingRate, numReviews,
  } = community;
  return (
    <Wrapper selected={selected} onClick={onClick}>
      <Image src={picture || defaultImage} />
      {selectable && <StyledCheckbox checked={selected} />}
      <Info>
        <StyledHeading level="subtitle">{name}</StyledHeading>
        <CommunityTilePriceRatingDiv>
          <div>
            ${startingRate}
            <Mobrate>/mo</Mobrate> 
            <Deskrate> per month</Deskrate>
          </div>
          <CommunityTileyRatingDiv>
            <Rating value={rating} size={size} palette={palette} />
            <CommunityTileNumberReviewDiv>
              {numReviews}
            </CommunityTileNumberReviewDiv>
          </CommunityTileyRatingDiv>
        </CommunityTilePriceRatingDiv>
      </Info>
    </Wrapper>
  );
};

CommunityTile.propTypes = {
  selectable: bool,
  selected: bool,
  size: string,
  palette: string,
  onClick: func,
  community: shape({
    name: string.isRequired,
    uri: string.isRequired,
    picture: string.isRequired,
    rating: number,
    startingRate: number,
    numReviews: number,
  }),
};

CommunityTile.defaultProps = {
  palette: 'secondary',
  size: 'medium',
};

export default CommunityTile;
