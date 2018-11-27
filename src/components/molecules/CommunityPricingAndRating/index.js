import React, { Fragment } from 'react';
import { number, string } from 'prop-types';
import styled from 'styled-components';

import { formatRating } from 'sly/services/helpers/rating';
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

const StyledBlock = styled(Block)`
  margin: 0;
`;

const CommunityPricingAndRating = ({ priceDescription, price, rating }) => {
  const ratingFixed = formatRating(rating);
  return (
    <Fragment>
      <Wrapper>
        {price &&
          <StyledCommunityPricingWrapper>
            <DescriptionBlock size="caption">{priceDescription}</DescriptionBlock>
            <Block size="title">
              ${price}
              <MoSpan size="caption">/mo<sup>*</sup></MoSpan>
            </Block>
          </StyledCommunityPricingWrapper>
        }
        {ratingFixed > 0 &&
          <div>
            <DescriptionBlock size="caption">Average Rating</DescriptionBlock>
            <Block size="title">
              <StyledIcon icon="star" palette="primary" />
              {ratingFixed}
            </Block>
          </div>
        }
      </Wrapper>
      <StyledBlock size="caption">
        * Your pricing will vary depending on your specific room and care service needs.
      </StyledBlock>
    </Fragment>
  );
};

CommunityPricingAndRating.propTypes = {
  priceDescription: string,
  price: number,
  rating: number,
};

CommunityPricingAndRating.defaultProps = {
  priceDescription: 'Est. pricing from',
};

export default CommunityPricingAndRating;
