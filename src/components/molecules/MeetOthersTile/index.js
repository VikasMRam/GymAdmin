import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

import { size } from 'sly/components/themes';

import { Heading, Block, Image } from 'sly/components/atoms';

const Wrapper = styled.div`
  width: ${size('picture.regular.width')};
  text-align: left;
`;
const StyledImage = styled(Image)`
  border-radius: ${size('border.large')};
  width: ${size('picture.regular.width')};
`;

const MeetOthersTile = ({
  image, title, description,
}) => (
  <Wrapper>
    <StyledImage src={image} />
    <Heading level="subtitle">{title}</Heading>
    <Block>{description}</Block>
  </Wrapper>
);

MeetOthersTile.propTypes = {
  image: string.isRequired,
  title: string.isRequired,
  description: string.isRequired,
};

export default MeetOthersTile;
