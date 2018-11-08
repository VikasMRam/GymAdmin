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

const StyledIcon = styled(Icon)`
  padding-top: ${size('spacing.small')};
  margin-right: ${size('spacing.regular')};
`;

const CommunityPricingAndRating = ({ priceDescription, price, rating }) => {
  return (
    <Wrapper>
      {price &&
      <StyledCommunityPricingWrapper>
        <DescriptionBlock size="caption">{priceDescription}</DescriptionBlock>
        <Block size="title">
          ${price}
          <MoSpan size="caption">/mo</MoSpan>
        </Block>
      </StyledCommunityPricingWrapper>
      }
      {rating &&
      <div>
        <DescriptionBlock size="caption">Average Rating</DescriptionBlock>
        <Block size="title">
          <StyledIcon icon="star" palette="primary" />
          {rating}
        </Block>
      </div>
      }
    </Wrapper>
  );
};

CommunityPricingAndRating.propTypes = {
  priceDescription: string,
  price: number,
  rating: number,
};


CommunityPricingAndRating.defaultProps = {
  priceDescription: 'Pricing starts from',
};

export default CommunityPricingAndRating;
