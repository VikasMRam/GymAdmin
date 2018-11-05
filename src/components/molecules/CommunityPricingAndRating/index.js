import React from 'react';
import { number, string } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import Block from 'sly/components/atoms/Block/index';
import Icon from 'sly/components/atoms/Icon/index';


const Wrapper = styled.div`
  display: flex;
`;

const StyledCommunityPricingWrapper = styled.div`
  width: calc(${size('layout.col2')} + ${size('layout.gutter')});
`;

const DescriptionBlock = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
`;

const MoSpan = styled.span`
  font-size: ${size('text.caption')};
`;

const PricingBox = styled.div`
  display: flex;
  align-items: baseline;
`;

const StyledIcon = styled(Icon)`
  padding-top: ${size('spacing.small')};
  margin-right: ${size('spacing.regular')};
`;

const CommunityPricingAndRating = ({ priceDescription, price, rating }) => {
  return (
    <Wrapper>
      <StyledCommunityPricingWrapper>
        <DescriptionBlock size="caption">{priceDescription}</DescriptionBlock>
        <Block size="title">${price} <MoSpan size="caption">/mo</MoSpan> </Block>
      </StyledCommunityPricingWrapper>
      <div>
        <DescriptionBlock size="caption">Average Rating</DescriptionBlock>
        <PricingBox>
          <StyledIcon icon="star" />
          <Block size="title">{rating}</Block>
        </PricingBox>
      </div>
    </Wrapper>
  );
};

CommunityPricingAndRating.propTypes = {
  priceDescription: string,
  price: number.isRequired,
  rating: number.isRequired,
};


CommunityPricingAndRating.defaultProps = {
  priceDescription: 'Pricing starts from',
};

export default CommunityPricingAndRating;
