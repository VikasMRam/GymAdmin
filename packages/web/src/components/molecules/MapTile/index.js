import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dotdotdot from 'react-dotdotdot';

import { Link } from 'sly/components/atoms';
import { size, palette, key } from 'sly/components/themes';
import Rating from 'sly/components/molecules/Rating';

const defaultImage =
  '//d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg';

const Wrapper = styled.div`
  display: flex;
  border: ${p => (p.borderless ? 0 : size('border.regular'))} solid
    ${palette('slate', 'stroke')};
  width: ${size('tile', 'large', 'width')};
  overflow: hidden;
  transition: box-shadow ${key('transitions.default')},
    opacity ${key('transitions.default')};

  &:hover {
    box-shadow: 0 ${size('spacing.small')} ${size('spacing.regular')} ${palette('grey', 'base')};
    opacity: 0.75;
    background: ${palette('white', 'base')};

    button {
      display: initial;
    }
  }
`;
const ImageWrapper = styled.div`
  line-height: 1.0;
`;

const TileImage = styled.img`
  width: ${size('tile.tiny.width')};
  height: ${size('tile.tiny.height')};


`;

const ChildrenWrapper = styled.div`
  margin-left: ${size('spacing.regular')};

`;

const NameDiv = styled.div`
  font-size: ${size('text.subtitle')};
  font-weight: bold;
`;

const PriceRatingDiv = styled.div`
  display: flex;
  font-size: ${size('text.body')};
`;

const RatingDiv = styled.div`
  display: flex;
`;

const NumberReviewDiv = styled.div`
  margin-left: ${size('spacing.regular')};
`;

const MapTile = ({ tileInfo, onClick, borderless }) => {
  const {
    id, mainImage, name, startingRate, propRatings, url,
  } = tileInfo;
  const { reviewsValue, numReviews } = propRatings;
  return (
    <Link key={id} to={url}>
      <Wrapper onClick={onClick} borderless={borderless}>
        <ImageWrapper>
          <TileImage src={mainImage || defaultImage} />
        </ImageWrapper>
        <ChildrenWrapper>
          <NameDiv>
            <Dotdotdot clamp={1}>{name}</Dotdotdot>
          </NameDiv>
          <PriceRatingDiv>
            <Dotdotdot clamp={1}>${startingRate} per month</Dotdotdot>
          </PriceRatingDiv>
          <RatingDiv>
            <Rating value={reviewsValue} size="regular" />
            {numReviews > 0 && (
              <NumberReviewDiv>
                {numReviews}
              </NumberReviewDiv>
            )}
          </RatingDiv>
        </ChildrenWrapper>
      </Wrapper>
    </Link>
  );
};

MapTile.propTypes = {
  tileInfo: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  borderless: PropTypes.bool,
};

MapTile.defaultProps = {
  borderless: false,
};

export default MapTile;
