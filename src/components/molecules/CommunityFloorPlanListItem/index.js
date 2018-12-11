import React from 'react';
import styled from 'styled-components';
import { string, number, func, oneOf } from 'prop-types';
import { Lazy } from 'react-lazy';

import { size, palette, assetPath } from 'sly/components/themes';
import Image from 'sly/components/atoms/Image/index';
import Block from 'sly/components/atoms/Block/index';

const Wrapper = styled.div`
  display: flex;
  padding: ${size('spacing.large')};
  border-bottom: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  &:hover {
    background-color: ${palette('primary', 'background')};
    border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  }
`;

const ImageWrapper = styled.div`
  object-fit: contain;
  margin-right: ${size('spacing.large')};
`;

const StyledImage = styled(Image)`
  width: ${size('element.xxLarge')};
`;

const TextSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    text-align: left;
    width: 100%;
  }
`;

const RoomTypeText = styled(Block)`
  margin-bottom: ${size('spacing.small')};
`;

const PriceSection = styled.div`
  display: flex;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-left: auto;
    flex-direction: column;
  }
`;

const PricingFromText = styled(Block)`
  margin-right: ${size('spacing.small')};
  line-height: 24px;
`;

const FullPriceSection = styled.div`
  display: flex;
`;

const FrequencyText = styled(Block)`
  line-height: 24px;
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
      <ImageWrapper>
        <Lazy component="div" ltIE9>
          <StyledImage src={imgSrc} />
        </Lazy>
      </ImageWrapper>
      <TextSection>
        <RoomTypeText>
          {`${typeOfCare} - ${roomType}`}
        </RoomTypeText>
        <PriceSection>
          <PricingFromText palette="grey" size="caption">Pricing from</PricingFromText>
          <FullPriceSection>
            <Block weight="medium">${priceToShow}</Block>
            <FrequencyText size="caption">/{priceTypeMap[priceType]}*</FrequencyText>
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
