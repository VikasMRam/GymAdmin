import React from 'react';
import styled, { css } from 'styled-components';
import { string, number, func, oneOf } from 'prop-types';
import { Lazy } from 'react-lazy';

import { size, palette, assetPath } from 'sly/components/themes';
import { Image, Block, Box, Span } from 'sly/components/atoms';

const bodyLineHeight = () => css`calc(${size('text.body')} * ${size('lineHeight.body')})`;

const Wrapper = styled.div`
  display: flex;
  padding: ${size('spacing.xLarge')};
  margin: 0 -${size('spacing.xLarge')};
  
  &:hover {
    background-color: ${palette('primary', 'background')};
  }
`;

const StyledBox = styled(Box)`
  flex-grow: 0;
  flex-shrink: 0;
  width: ${size('element.xxLarge')};
  height: ${size('element.xxLarge')};
  background: ${palette('white.base')};
  margin-right: ${size('spacing.large')};
`;

const StyledImage = styled(Image)`
  img {
    object-fit: contain;
  }
`;

const TextSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
`;

const RoomTypeText = styled(Block)`
  margin-bottom: ${size('spacing.small')};
  
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const PriceSection = styled.div`
  display: flex;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-left: auto;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }
`;

const PricingFromText = styled(Block)`
  margin-right: ${size('spacing.small')};
  line-height: ${bodyLineHeight}; 
  
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin: 0;
    margin-bottom: ${size('spacing.small')};
  }
`;

const FullPriceSection = styled.div`
  line-height: ${bodyLineHeight}; 
`;

const priceTypeMap = {
  'Monthly Rate': 'mo',
  'Daily Rate': 'day',
};

const CommunityFloorPlanListItem = ({
  image, typeOfCare, roomType, shareType, price, priceShared, priceType, onItemClick,
}) => {
  let imgSrc = assetPath('images/floorplan-placeholder.svg');
  if (image) {
    imgSrc = image;
  }
  let priceToShow = price;
  if (shareType === 'Shared') {
    priceToShow = priceShared;
  }

  return (
    <Wrapper onClick={onItemClick}>
      <StyledBox padding="small">
        <Lazy component="div" ltIE9>
          <StyledImage src={imgSrc} aspectRatio="1:1" />
        </Lazy>
      </StyledBox>
      <TextSection>
        <RoomTypeText>
          {`${typeOfCare} - ${roomType}`}
        </RoomTypeText>
        <PriceSection>
          <PricingFromText palette="grey" size="caption">Pricing from</PricingFromText>
          <FullPriceSection>
            <Span weight="medium">${priceToShow}</Span>
            <Span>/{priceTypeMap[priceType]}*</Span>
          </FullPriceSection>
        </PriceSection>
      </TextSection>
    </Wrapper>
  );
};


CommunityFloorPlanListItem.propTypes = {
  image: string,
  typeOfCare: string.isRequired,
  roomType: string.isRequired,
  shareType: string.isRequired,
  price: number,
  priceShared: number,
  priceType: oneOf(Object.keys(priceTypeMap)).isRequired,
  onItemClick: func,
};


export default CommunityFloorPlanListItem;
