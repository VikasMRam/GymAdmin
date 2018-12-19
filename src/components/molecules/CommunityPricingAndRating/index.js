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
Wrapper.displayName = 'Wrapper';

const StyledCommunityPricingWrapper = styled.div`
  width: calc(${size('layout.col2')} + ${size('layout.gutter')});
`;

const DescriptionBlock = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
`;

const MoSpan = styled.span`
  font-size: ${size('text.caption')};
  font-weight: normal;
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
        {price > 0 &&
          <StyledCommunityPricingWrapper>
            <DescriptionBlock size="caption">{priceDescription}</DescriptionBlock>
            <Block size="title" weight="medium">
              ${price}
              <MoSpan size="caption">/mo<sup>*</sup></MoSpan>
            </Block>
          </StyledCommunityPricingWrapper>
        }
        {ratingFixed > 0 &&
          <div>
            <DescriptionBlock size="caption">Average Rating</DescriptionBlock>
            <Block size="title" weight="medium">
              <StyledIcon icon="star" palette="secondary" />
              {ratingFixed}
            </Block>
          </div>
        }
      </Wrapper>
      {price > 0 &&
        <StyledBlock size="caption" palette="grey">
          * Your pricing will vary depending on your specific room and care service needs.
        </StyledBlock>
      }
    </Fragment>
  );
};

CommunityPricingAndRating.propTypes = {
  priceDescription: string,
  price: number,
  rating: number,
};

CommunityPricingAndRating.defaultProps = {
  priceDescription: 'Estimated pricing',
  price: 0,
  rating: 0,
};

export default CommunityPricingAndRating;
