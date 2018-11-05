import React from 'react';
import { number } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import Block from 'sly/components/atoms/Block/index';
import { Heading, Icon } from 'sly/components/atoms/index';

const DescriptionBlock = styled(Block)`
  margin-bottom: ${size('spacing.small')};
`;

const PricingBox = styled.div`
  display: flex;
  align-items: baseline;
`;

const StyledIcon = styled(Icon)`
  padding-top: ${size('spacing.small')};
  margin-right: ${size('spacing.regular')};
`;

const CommunityAverageRating = ({ rating }) => {
  return (
    <div>
      <DescriptionBlock size="caption">Average Rating</DescriptionBlock>
      <PricingBox>
        <StyledIcon icon="star" />
        <Heading>{rating}</Heading>
      </PricingBox>
    </div>
  );
};

CommunityAverageRating.propTypes = {
  rating: number.isRequired,
};

export default CommunityAverageRating;
