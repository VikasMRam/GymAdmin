import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

import { size, getKey } from 'sly/common/components/themes';
import { Hr, Block, Paragraph } from 'sly/common/components/atoms';
import { Image } from 'sly/web/components/atoms';

const Wrapper = styled.div`
  display: flex;
`;

const ImageWrapper = styled.div`
  margin-right: ${size('spacing.large')};
  width: ${size('element.xxLarge')};

  > * {
    width: inherit;
  }

  img {
    width: ${size('element.xxLarge')};
    height: ${size('element.xxLarge')};
    border-radius: 50%;
  }
`;

const PartnerReview = ({
  image, review, name, location,
}) => (
  <Wrapper>
    <ImageWrapper>
      <Image src={image} aspectRatio="16:9" />
    </ImageWrapper>
    <div>
      <Paragraph>&quot;{review}&quot;</Paragraph>
      <Hr
        palette="primary"
        borderTop="large"
        marginTop="0"
        marginBottom="large"
        width={getKey('sizes.element.large')}
      />
      <Block weight="medium">{name}</Block>
      <Block palette="grey">{location}</Block>
    </div>
  </Wrapper>
);

PartnerReview.propTypes = {
  image: string.isRequired,
  review: string.isRequired,
  name: string.isRequired,
  location: string.isRequired,
};

export default PartnerReview;
