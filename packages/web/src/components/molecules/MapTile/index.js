import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { size, palette, key } from 'sly/web/components/themes';
import { Link, ClampedText } from 'sly/web/components/atoms';
import Rating from 'sly/web/components/molecules/Rating';

const defaultImage =
  '//d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${size('tile.tiny.width')} 1fr;
  grid-gap: ${size('spacing.regular')};
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
  height: 100%;
`;

const ChildrenWrapper = styled.div`
  min-width: 0;
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
  const rateText = `$${startingRate} per month`;

  return (
    <Link key={id} to={url}>
      <Wrapper onClick={onClick} borderless={borderless}>
        <ImageWrapper>
          <TileImage src={mainImage || defaultImage} />
        </ImageWrapper>
        <ChildrenWrapper>
          <ClampedText palette="primary" size="subtitle" weight="bold" title={name}>{name}</ClampedText>
          <ClampedText palette="primary" title={rateText}>{rateText}</ClampedText>
          <RatingDiv>
            <Rating value={reviewsValue} size="title" />
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
