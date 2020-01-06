import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { Image, Paragraph, Hr, Block } from 'sly/components/atoms';

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

const StyledHr = styled(Hr)`
  border-width: ${size('border.large')};
  width: ${size('element.large')};
  margin-top: 0;
  margin-bottom: ${size('spacing.large')};
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
      <StyledHr palette="secondary" variation="dark35" />
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
